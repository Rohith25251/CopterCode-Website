import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Building, Calendar, FileDown, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';
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
                .select('*')
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

    return (
        <div className="min-h-screen bg-background text-primary py-12">
            <SEO
                title={certificate ? `Certificate ${certificate.cert_code} Verification` : 'Certificate Verification'}
                description="Validate CopterCode issued certificates using the QR code and certificate ID."
            />

            <div className="container mx-auto px-6 max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold">Certificate Verification</h1>
                    <p className="text-secondary mt-2">Certificate ID: <span className="font-semibold text-primary">{certCode || 'MISSING'}</span></p>
                </div>

                {loading && (
                    <div className="bg-white border border-border rounded-2xl p-8">Verifying certificate...</div>
                )}

                {!loading && error === 'config' && (
                    <div className="bg-white border border-amber-200 rounded-2xl p-8">
                        <div className="flex items-center gap-3 text-amber-700 font-semibold"><ShieldAlert size={20} /> Verification service is not configured</div>
                        <p className="text-secondary mt-3">Set VITE_CERT_VERIFY_API_BASE_URL (recommended) or configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.</p>
                    </div>
                )}

                {!loading && (error === 'missing' || error === 'not_found') && (
                    <div className="bg-white border border-red-200 rounded-2xl p-8">
                        <div className="flex items-center gap-3 text-red-700 font-semibold"><ShieldX size={20} /> Certificate not found</div>
                        <p className="text-secondary mt-3">The QR code URL is invalid or the certificate code does not exist.</p>
                    </div>
                )}

                {!loading && error === 'unknown' && (
                    <div className="bg-white border border-red-200 rounded-2xl p-8">
                        <div className="flex items-center gap-3 text-red-700 font-semibold"><ShieldAlert size={20} /> Verification failed</div>
                        <p className="text-secondary mt-3">Could not fetch certificate data. Try again after a few moments.</p>
                    </div>
                )}

                {!loading && certificate && (
                    <div className="bg-white border border-border rounded-2xl p-8 space-y-6">
                        <div className="flex items-center gap-3 font-semibold text-lg">
                            {error === 'revoked' || error === 'expired' ? <ShieldAlert className="text-amber-600" /> : <ShieldCheck className="text-green-600" />}
                            {error === 'revoked' ? 'Certificate Revoked' : error === 'expired' ? 'Certificate Expired' : 'Certificate Verified'}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div><span className="text-secondary">Code</span><p className="font-semibold">{certificate.cert_code}</p></div>
                            <div><span className="text-secondary">Name</span><p className="font-semibold">{certificate.name}</p></div>
                            <div><span className="text-secondary">College</span><p className="font-semibold flex items-center gap-2"><Building size={14} /> {certificate.college}</p></div>
                            {certificate.batch && <div><span className="text-secondary">Year of Study</span><p className="font-semibold">{certificate.batch}</p></div>}
                            {certificate.internship_period && <div><span className="text-secondary">Batch</span><p className="font-semibold">{certificate.internship_period}</p></div>}
                            {certificate.department && <div><span className="text-secondary">Department</span><p className="font-semibold">{certificate.department}</p></div>}
                            {certificate.role && <div><span className="text-secondary">Role</span><p className="font-semibold">{certificate.role}</p></div>}
                            <div><span className="text-secondary">Issue Date</span><p className="font-semibold flex items-center gap-2"><Calendar size={14} /> {formatDate(certificate.issue_date || certificate.created_at)}</p></div>
                            {certificate.expiry_date && <div><span className="text-secondary">Expiry Date</span><p className="font-semibold">{formatDate(certificate.expiry_date)}</p></div>}
                        </div>

                        {certificate.pdf_url && (
                            <div className="pt-2">
                                <a
                                    href={certificate.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-full"
                                >
                                    <FileDown size={16} /> View Certificate PDF
                                </a>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <Link to="/" className="text-accent font-semibold">Back to Homepage</Link>
                </div>
            </div>
        </div>
    );
};

export default CertificateVerify;
