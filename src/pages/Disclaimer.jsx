import React, { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { AlertTriangle } from 'lucide-react';
import './Disclaimer.css';

const Disclaimer = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
            <div className="container disclaimerContainer">
                <div className="disclaimerHeader">
                    <AlertTriangle size={48} color="var(--primary-color)" />
                    <h1>Disclaimer</h1>
                </div>

                <div className="disclaimerContent">
                    <section>
                        <h2>Tentang Konten</h2>
                        <p>
                            Website <strong>Rebahan</strong> adalah platform streaming yang menampilkan konten film dan serial TV
                            dari berbagai sumber melalui API pihak ketiga. Kami <strong>TIDAK menyimpan</strong>,
                            <strong>TIDAK mengupload</strong>, dan <strong>TIDAK meng-host</strong> file video apapun di server kami.
                        </p>
                    </section>

                    <section>
                        <h2>Sumber Data</h2>
                        <p>
                            Semua data konten (termasuk judul, deskripsi, poster, dan link streaming) diperoleh dari
                            API eksternal yang disediakan oleh pihak ketiga. Kami hanya berfungsi sebagai agregator
                            yang menampilkan informasi tersebut kepada pengguna.
                        </p>
                    </section>

                    <section>
                        <h2>Hak Cipta</h2>
                        <p>
                            Kami menghormati hak kekayaan intelektual dan hak cipta. Semua konten yang ditampilkan
                            di website ini adalah milik dari pemilik hak cipta masing-masing. Jika Anda adalah
                            pemilik hak cipta dan merasa konten Anda ditampilkan tanpa izin, silakan hubungi
                            penyedia API yang kami gunakan.
                        </p>
                    </section>

                    <section>
                        <h2>Batasan Tanggung Jawab</h2>
                        <p>
                            Rebahan <strong>TIDAK bertanggung jawab</strong> atas:
                        </p>
                        <ul>
                            <li>Keakuratan, kelengkapan, atau ketersediaan konten yang ditampilkan</li>
                            <li>Pelanggaran hak cipta atau masalah hukum terkait konten</li>
                            <li>Kerugian atau kerusakan yang timbul dari penggunaan website ini</li>
                            <li>Konten yang mungkin tidak pantas atau menyinggung</li>
                            <li>Masalah teknis, virus, atau malware dari sumber eksternal</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Penggunaan Website</h2>
                        <p>
                            Dengan menggunakan website ini, Anda menyetujui bahwa:
                        </p>
                        <ul>
                            <li>Anda menggunakan website ini atas risiko Anda sendiri</li>
                            <li>Anda memahami bahwa kami hanya menyediakan akses ke konten dari pihak ketiga</li>
                            <li>Anda bertanggung jawab untuk mematuhi hukum yang berlaku di wilayah Anda</li>
                            <li>Kami berhak mengubah atau menghentikan layanan kapan saja tanpa pemberitahuan</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Perubahan Disclaimer</h2>
                        <p>
                            Kami berhak untuk mengubah disclaimer ini kapan saja. Perubahan akan berlaku segera
                            setelah dipublikasikan di halaman ini. Penggunaan website yang berkelanjutan setelah
                            perubahan berarti Anda menerima disclaimer yang telah diperbarui.
                        </p>
                    </section>

                    <section>
                        <h2>Kontak</h2>
                        <p>
                            Jika Anda memiliki pertanyaan tentang disclaimer ini atau ingin melaporkan konten yang
                            melanggar, silakan hubungi penyedia API yang kami gunakan atau hubungi kami melalui
                            halaman kontak.
                        </p>
                    </section>

                    <div className="disclaimerFooter">
                        <p>
                            <strong>Terakhir diperbarui:</strong> {new Date().toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Disclaimer;
