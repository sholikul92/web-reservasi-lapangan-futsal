export default function MapsSection() {
  return (
    <div>
      <h1 className='mb-8 text-2xl font-semibold text-center md:text-4xl'>Lokasi Kami</h1>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.386419368788!2d106.6371605749847!3d-6.078519259640816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a03cd77f34895%3A0xca2049365c65cd47!2sUNIPI%20Kampus%20F%20Teluknaga!5e0!3m2!1sid!2sid!4v1748695760325!5m2!1sid!2sid'
        width='600'
        height='450'
        allowFullScreen={true}
        loading='lazy'
        referrerPolicy='no-referrer-when-downgrade'
        className='w-full'
      ></iframe>
    </div>
  );
}
