interface GradientBannerProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  CTA?: React.ReactNode;
}

export default function GradientBanner({
  title,
  description,
  CTA,
}: GradientBannerProps) {
  return (
    <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4'>
      <div className='max-w-6xl mx-auto text-center'>
        <h1 className='text-2xl font-bold mb-4'>{title}</h1>
        <p className='mb-4'>{description}</p>
        <div>{CTA}</div>
      </div>
    </section>
  );
}
