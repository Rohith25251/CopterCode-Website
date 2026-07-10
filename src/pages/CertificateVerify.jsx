import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { 
    Building, 
    Calendar, 
    FileDown, 
    ShieldAlert, 
    ShieldCheck, 
    ShieldX, 
    GraduationCap, 
    ExternalLink, 
    Sparkles, 
    Briefcase 
} from 'lucide-react';
import SEO from '../components/SEO';
import { hasSupabaseConfig, supabase } from '../lib/supabaseClient';

const verifyApiBaseUrl = (import.meta.env.VITE_CERT_VERIFY_API_BASE_URL || '').trim().replace(/\/$/, '');

const CertificateVerify = () => {
    const [searchParams] = useSearchParams();
    const { certCode: certCodeFromPath } = useParams();

    const certCode = useMemo(() => {
        const queryCode = searchParams.get('id')?.trim();
        const pathCode = certCodeFromPath?.trim();
        return queryCode || pathCode || '';
    }, [searchParams, certCodeFromPath]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [certificate, setCertificate] = useState(null);

    useEffect(() => {
        const fetchFromBackend = async (code) => {
            if (!verifyApiBaseUrl) return { data: null, failed: false };

            try {
                const response = await fetch(`${verifyApiBaseUrl}/api/certificates/${encodeURIComponent(code)}`);

                if (response.status === 404) {
                    return { data: null, failed: false };
                }

                if (!response.ok) {
                    return { data: null, failed: true };
                }

                const data = await response.json();
                return { data, failed: false };
            } catch {
                return { data: null, failed: true };
            }
        };

        const fetchFromSupabase = async (code) => {
            if (!hasSupabaseConfig || !supabase) return { data: null, failed: false };

            const { data, error: dbError } = await supabase
                .from('certificates')
                .select('*, interns(*)')
                .or(`cert_code.eq.${code},cert_code.eq.${code.toUpperCase()},cert_code.eq.${code.toLowerCase()}`)
                .limit(1)
                .maybeSingle();

            if (dbError) {
                return { data: null, failed: true };
            }

            return { data: data || null, failed: false };
        };

        const fetchCertificate = async () => {
            if (!certCode) {
                setError('missing');
                setLoading(false);
                return;
            }

            if (!verifyApiBaseUrl && (!hasSupabaseConfig || !supabase)) {
                setError('config');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const code = certCode.trim();

                const backendResult = await fetchFromBackend(code);
                let certData = backendResult.data;
                let sourceFailed = backendResult.failed;

                if (!certData) {
                    const supabaseResult = await fetchFromSupabase(code);
                    certData = supabaseResult.data;
                    sourceFailed = sourceFailed && supabaseResult.failed;
                }

                if (sourceFailed && !certData) {
                    setError('unknown');
                    return;
                }

                if (!certData) {
                    setError('not_found');
                    return;
                }

                const cert = certData;
                setCertificate(cert);

                if (cert.status === 'revoked') {
                    setError('revoked');
                    return;
                }

                if (cert.expiry_date && new Date(cert.expiry_date) < new Date()) {
                    setError('expired');
                    return;
                }
            } catch {
                setError('unknown');
            } finally {
                setLoading(false);
            }
        };

        fetchCertificate();
    }, [certCode]);

    const formatDate = (value) => {
        if (!value) return 'N/A';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return value;
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const displayCert = useMemo(() => {
        if (!certificate) return null;
        const internObj = Array.isArray(certificate.interns) ? certificate.interns[0] : certificate.interns;
        return {
            cert_code: certificate.cert_code,
            name: internObj?.name || certificate.name,
            college: internObj?.college || certificate.college,
            year: internObj?.year || certificate.batch || certificate.year,
            department: internObj?.department || certificate.department,
            role: internObj?.role || certificate.role,
            project: internObj?.project || certificate.project,
            month: internObj?.month || certificate.month,
            issue_date: formatDate(certificate.issue_date || internObj?.date || certificate.created_at),
            expiry_date: certificate.expiry_date ? formatDate(certificate.expiry_date) : null
        };
    }, [certificate]);

    const resolvedPdfUrl = useMemo(() => {
        if (!certificate?.pdf_url) return '';
        const marker = '/api/certificates/';
        const index = certificate.pdf_url.indexOf(marker);
        if (index !== -1) {
            const path = certificate.pdf_url.substring(index);
            if (verifyApiBaseUrl) {
                return `${verifyApiBaseUrl}${path}`;
            }
        }
        return certificate.pdf_url;
    }, [certificate]);

    return (
        <div className="relative min-h-screen bg-[#faf9f6] text-zinc-800 font-sans pt-12 pb-20 px-6">
            <SEO
                title={certificate ? `Certificate ${certificate.cert_code} Verification` : 'Certificate Verification'}
                description="Validate CopterCode issued certificates using the QR code and certificate ID."
            />

            {/* Background pattern */}
            <div className="absolute inset-0 bg-[#faf9f6] pointer-events-none -z-10" />

            <div className="max-w-3xl mx-auto mb-10 text-center">
                <div className="inline-flex gap-2 items-center bg-white border border-zinc-200 px-4 py-1.5 rounded-2xl mb-4 shadow-sm">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">CopterCode Certificate Registry</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-primary">
                    Credential Verification
                </h1>
                <p className="text-xs text-zinc-500 mt-2">
                    Verify academic, project, and internship certificate codes securely.
                </p>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white border border-zinc-200 rounded-[32px] p-8 shadow-[0_15px_50px_rgba(0,0,0,0.03)] max-w-3xl mx-auto">
                    <div className="relative w-12 h-12 mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
                        <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
                    </div>
                    <p className="text-xs font-semibold text-zinc-500">Verifying credential integrity...</p>
                </div>
            )}

            {!loading && error === 'config' && (
                <div className="max-w-md mx-auto bg-white border border-amber-200 rounded-[32px] p-8 text-center shadow-lg">
                    <div className="inline-flex p-4 rounded-full bg-amber-50 border border-amber-200 text-amber-700 mb-6">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-black text-zinc-900">Verification service is not configured</h2>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                        Set VITE_CERT_VERIFY_API_BASE_URL (recommended) or configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
                    </p>
                </div>
            )}

            {!loading && (error === 'missing' || error === 'not_found') && (
                <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-[32px] p-8 text-center shadow-lg">
                    <div className="inline-flex p-4 rounded-full bg-red-50 border border-red-150 text-red-600 mb-6">
                        <ShieldX className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-black text-zinc-900">Certificate Not Found</h2>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                        The credential code specified does not match any certificate in our records. Please verify the URL or barcode scanner query.
                    </p>
                    <div className="mt-6 pt-6 border-t border-zinc-150">
                        <span className="text-[10px] font-mono font-bold bg-zinc-50 text-zinc-600 px-3 py-1.5 rounded border border-zinc-200">
                            QUERY ID: {certCode || "MISSING"}
                        </span>
                    </div>
                </div>
            )}

            {!loading && error === 'unknown' && (
                <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-[32px] p-8 text-center shadow-lg">
                    <div className="inline-flex p-4 rounded-full bg-red-50 border border-red-150 text-red-650 mb-6">
                        <ShieldX className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-black text-zinc-900">Verification failed</h2>
                    <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                        Could not fetch certificate data. Try again after a few moments.
                    </p>
                </div>
            )}

            {!loading && error === 'revoked' && certificate && displayCert && (
                <div className="max-w-lg mx-auto bg-white border border-red-200 rounded-[32px] p-8 text-center shadow-lg">
                    <div className="inline-flex p-4 rounded-full bg-red-50 border border-red-200 text-red-600 mb-6">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-black text-red-600">Credential Revoked</h2>
                    <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                        This certificate (code: <span className="font-mono text-zinc-800 font-bold">{certificate.cert_code}</span>) has been explicitly revoked by the issuer and is no longer valid.
                    </p>
                    {certificate.revoke_reason && (
                        <p className="text-xs text-red-500 italic mt-2 bg-red-50 border border-red-100 py-2.5 px-4 rounded-xl inline-block">
                            Reason: {certificate.revoke_reason}
                        </p>
                    )}
                </div>
            )}

            {!loading && error === 'expired' && certificate && displayCert && (
                <div className="max-w-lg mx-auto bg-white border border-amber-200 rounded-[32px] p-8 text-center shadow-lg">
                    <div className="inline-flex p-4 rounded-full bg-amber-50 border border-amber-200 text-amber-600 mb-6">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                    <h2 className="text-xl font-black text-amber-700">Credential Expired</h2>
                    <p className="text-xs text-zinc-555 mt-2 leading-relaxed">
                        This certificate (code: <span className="font-mono text-zinc-800 font-bold">{certificate.cert_code}</span>) has passed its valid lifetime duration of <span className="font-bold text-amber-700">{formatDate(certificate.expiry_date)}</span>.
                    </p>
                </div>
            )}

            {!loading && !error && certificate && displayCert && (
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Verification Success Badge */}
                    <div className="bg-white border border-emerald-500/30 rounded-[32px] p-6 md:p-8 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-650 shrink-0">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-extrabold tracking-wider bg-emerald-50 border border-emerald-150 text-emerald-700 px-2.5 py-0.5 rounded-full uppercase">
                                        Verified Credential
                                    </span>
                                    <h2 className="text-xl md:text-2xl font-black text-zinc-900 mt-1.5">
                                        Valid Certificate
                                    </h2>
                                    <p className="text-xs text-zinc-550 mt-0.5 font-mono">
                                        Certificate Code: <span className="text-zinc-850 font-bold">{certificate.cert_code}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <a 
                                    href={resolvedPdfUrl}
                                    download
                                    className="flex items-center gap-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-zinc-200 shadow-sm transition-colors cursor-pointer"
                                >
                                    <FileDown className="w-4 h-4" /> Download PDF
                                </a>
                                <a 
                                    href={resolvedPdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 bg-primary hover:bg-accent-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
                                >
                                    <ExternalLink className="w-4 h-4" /> Open In Tab
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Certificate fields details */}
                        <div className="md:col-span-5 bg-white border border-zinc-200 rounded-[32px] p-6 shadow-lg space-y-5">
                            <h3 className="text-sm font-black text-zinc-500 border-b border-zinc-150 pb-3 uppercase tracking-wider">
                                Credential Attributes
                            </h3>

                            {/* Candidate Name */}
                            <div className="flex gap-3">
                                <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Candidate Name</span>
                                    <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.name}</span>
                                </div>
                            </div>

                            {/* Institution */}
                            <div className="flex gap-3">
                                <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                    <Building className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Institution</span>
                                    <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.college}</span>
                                </div>
                            </div>

                            {/* Year */}
                            {displayCert.year && (
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Year</span>
                                        <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.year}</span>
                                    </div>
                                </div>
                            )}

                            {/* Department */}
                            {displayCert.department && (
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Department</span>
                                        <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.department}</span>
                                    </div>
                                </div>
                            )}

                            {/* Domain */}
                            {displayCert.role && (
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Domain</span>
                                        <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.role}</span>
                                    </div>
                                </div>
                            )}

                            {/* Internship & Live Project Area */}
                            {displayCert.project && (
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                        <Briefcase className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Internship & Live Project Area</span>
                                        <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.project}</span>
                                    </div>
                                </div>
                            )}

                            {/* Batch */}
                            {displayCert.month && (
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Batch</span>
                                        <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.month}</span>
                                    </div>
                                </div>
                            )}

                            {/* Date of Issue */}
                            <div className="flex gap-3">
                                <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Date of Issue</span>
                                    <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.issue_date}</span>
                                </div>
                            </div>

                            {/* Expiry Date */}
                            {displayCert.expiry_date && (
                                <div className="flex gap-3">
                                    <div className="bg-zinc-100 p-2 rounded-xl text-zinc-650 shrink-0 h-10 w-10 flex items-center justify-center">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">Expiry Date</span>
                                        <span className="text-sm font-bold text-zinc-800 leading-tight block">{displayCert.expiry_date}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* PDF Live Embed */}
                        <div className="md:col-span-7 bg-white border border-zinc-200 rounded-[32px] p-6 shadow-lg flex flex-col min-h-[400px]">
                            <h3 className="text-sm font-black text-zinc-500 border-b border-zinc-150 pb-3 mb-4 uppercase tracking-wider">
                                Document Preview
                            </h3>
                            
                            <div className="flex-1 w-full bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200 relative group min-h-[350px]">
                                <iframe 
                                    src={`${resolvedPdfUrl}#toolbar=0`} 
                                    className="w-full h-full border-0 absolute inset-0"
                                    title="Certificate PDF Viewer"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-3xl mx-auto mt-12 text-center">
                <Link to="/" className="text-zinc-500 hover:text-zinc-800 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer">
                    Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default CertificateVerify;
