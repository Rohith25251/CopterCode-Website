import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Building, Calendar, FileDown, ShieldCheck, User, Briefcase, GraduationCap, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { hasSupabaseConfig, supabase } from '../lib/supabaseClient';

const verifyApiBaseUrl = (import.meta.env.VITE_CERT_VERIFY_API_BASE_URL || '').trim().replace(/\/$/, '');

const InternPortal = () => {
    const [searchParams] = useSearchParams();
    const internId = searchParams.get('id')?.trim();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [intern, setIntern] = useState(null);
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        const fetchInternData = async () => {
            if (!internId) {
                setError('missing');
                setLoading(false);
                return;
            }

            if (!hasSupabaseConfig || !supabase) {
                setError('config');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // 1. Fetch Intern details
                const { data: internData, error: internError } = await supabase
                    .from('interns')
                    .select('*')
                    .eq('id', internId)
                    .maybeSingle();

                if (internError) {
                    console.error("Supabase error fetching intern:", internError);
                    setError('db_error');
                    return;
                }

                if (!internData) {
                    setError('not_found');
                    return;
                }

                setIntern(internData);

                // 2. Fetch associated certificates
                const { data: certsData, error: certsError } = await supabase
                    .from('certificates')
                    .select('*')
                    .eq('intern_id', internId)
                    .eq('status', 'active');

                if (certsError) {
                    console.error("Supabase error fetching certs:", certsError);
                    setError('db_error');
                    return;
                }

                setCertificates(certsData || []);

            } catch (err) {
                console.error("Failed to load intern portal data:", err);
                setError('unknown');
            } finally {
                setLoading(false);
            }
        };

        fetchInternData();
    }, [internId]);

    const getCertLabel = (type) => {
        if (type === 'lor') return 'Letter of Recommendation';
        if (type === 'experience') return 'Experience Letter';
        return 'Internship Certificate';
    };

    return (
        <div className="min-h-screen bg-background text-primary py-16">
            <SEO
                title={intern ? `${intern.name} - Intern Portal` : 'Intern Portal'}
                description="Access and download your internship documents and credentials."
            />

            <div className="container mx-auto px-6 max-w-4xl">
                
                {/* Branding Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
                        Intern Certificate Portal
                    </h1>
                    <p className="text-secondary mt-2">
                        Verify and download your official CopterCode internship credentials.
                    </p>
                </div>

                {loading && (
                    <div className="bg-white border border-border rounded-3xl p-12 text-center shadow-lg">
                        <div className="w-10 h-10 border-2 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-secondary font-medium">Retrieving credential records...</p>
                    </div>
                )}

                {!loading && error === 'config' && (
                    <div className="bg-white border border-amber-200 rounded-3xl p-8 shadow-lg max-w-2xl mx-auto text-center">
                        <h2 className="text-xl font-bold text-amber-700 mb-2">Service Configuration Error</h2>
                        <p className="text-secondary">Supabase client credentials are not configured on this client instance.</p>
                    </div>
                )}

                {!loading && (error === 'missing' || error === 'not_found') && (
                    <div className="bg-white border border-red-200 rounded-3xl p-10 shadow-lg max-w-xl mx-auto text-center">
                        <h2 className="text-xl font-bold text-red-600 mb-2">Access Token Invalid</h2>
                        <p className="text-secondary mb-6">We could not find an intern profile corresponding to this link. Please check your email URL or verify with support.</p>
                        <span className="text-[10px] font-mono bg-zinc-50 border border-zinc-150 px-3 py-1.5 rounded text-zinc-500">
                            TOKEN: {internId || 'MISSING'}
                        </span>
                    </div>
                )}

                {!loading && error === 'db_error' && (
                    <div className="bg-white border border-red-150 rounded-3xl p-10 shadow-lg max-w-xl mx-auto text-center">
                        <h2 className="text-xl font-bold text-red-600 mb-2">Connection Timeout</h2>
                        <p className="text-secondary">Failed to establish connection to registry servers. Please reload the page.</p>
                    </div>
                )}

                {!loading && intern && (
                    <div className="space-y-8">
                        
                        {/* Profile Details Card */}
                        <div className="bg-white border border-border rounded-3xl p-8 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
                            
                            <h2 className="text-lg font-bold text-zinc-800 border-b border-zinc-100 pb-4 mb-6 flex items-center gap-2.5">
                                <User className="w-5 h-5 text-violet-500" /> Intern Profile
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm">
                                <div className="flex gap-3">
                                    <div className="bg-zinc-50 p-2.5 rounded-xl text-zinc-550 h-10 w-10 flex items-center justify-center shrink-0">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Full Name</span>
                                        <span className="text-sm font-bold text-zinc-800">{intern.name}</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="bg-zinc-50 p-2.5 rounded-xl text-zinc-550 h-10 w-10 flex items-center justify-center shrink-0">
                                        <GraduationCap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">College / Institution</span>
                                        <span className="text-sm font-bold text-zinc-800">{intern.college}</span>
                                    </div>
                                </div>

                                {intern.department && (
                                    <div className="flex gap-3">
                                        <div className="bg-zinc-50 p-2.5 rounded-xl text-zinc-550 h-10 w-10 flex items-center justify-center shrink-0">
                                            <GraduationCap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Department / Branch</span>
                                            <span className="text-sm font-bold text-zinc-800">{intern.department}</span>
                                        </div>
                                    </div>
                                )}

                                {intern.role && (
                                    <div className="flex gap-3">
                                        <div className="bg-zinc-50 p-2.5 rounded-xl text-zinc-550 h-10 w-10 flex items-center justify-center shrink-0">
                                            <Briefcase className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Role / Domain</span>
                                            <span className="text-sm font-bold text-zinc-800">{intern.role}</span>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <div className="bg-zinc-50 p-2.5 rounded-xl text-zinc-550 h-10 w-10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Batch Period</span>
                                        <span className="text-sm font-bold text-zinc-800">{intern.month || intern.year}</span>
                                    </div>
                                </div>

                                {intern.project && (
                                    <div className="flex gap-3 col-span-1 md:col-span-2">
                                        <div className="bg-zinc-50 p-2.5 rounded-xl text-zinc-550 h-10 w-10 flex items-center justify-center shrink-0">
                                            <Award className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Project Undertaken</span>
                                            <span className="text-sm font-bold text-zinc-800">{intern.project}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Certificates Release Section */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-zinc-800 flex items-center gap-2">
                                <Award className="w-5 h-5 text-indigo-500" /> Issued Credentials
                            </h2>

                            {certificates.length === 0 ? (
                                <div className="bg-white border border-border rounded-3xl p-8 text-center text-secondary">
                                    No active certificates found for this account.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {certificates.map((cert) => {
                                        const downloadUrl = `${verifyApiBaseUrl}/api/certificates/${cert.cert_code}/pdf`;
                                        return (
                                            <div key={cert.id} className="bg-white border border-border rounded-3xl p-6 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
                                                <div>
                                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 border border-emerald-150 text-emerald-700 px-2.5 py-0.5 rounded-full uppercase mb-3">
                                                        <ShieldCheck className="w-3.5 h-3.5" /> Verified
                                                    </span>
                                                    <h3 className="text-base font-bold text-zinc-850">
                                                        {getCertLabel(cert.cert_type)}
                                                    </h3>
                                                    <p className="text-[11px] font-mono text-zinc-400 mt-1">
                                                        ID: {cert.cert_code}
                                                    </p>
                                                </div>

                                                <div className="mt-6 flex items-center gap-3">
                                                    <a 
                                                        href={downloadUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 text-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                                                    >
                                                        <FileDown className="w-4 h-4" /> Download PDF
                                                    </a>
                                                    <a 
                                                        href={`/verify?id=${cert.cert_code}`}
                                                        className="text-zinc-600 hover:text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors shrink-0"
                                                    >
                                                        Verify Details
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default InternPortal;
