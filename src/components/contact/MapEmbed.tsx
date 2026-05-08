export default function MapEmbed() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <iframe
        title="techno.cep Konum"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3044.2!2d28.9633754!3d40.2194179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca154182657d2b%3A0x2b4517fd41a35b6c!2sTechnoCep%20-%20Aksesuar%2C%20Teknik%20Servis%2C%20Yedek%20Par%C3%A7a%2C%20Tamir!5e0!3m2!1str!2str!4v1715000000000!5m2!1str!2str"
        width="100%"
        height="340"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
