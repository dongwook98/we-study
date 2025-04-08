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
    <section className='bg-gradient p-4 text-center'>
      <h1 className='text-2xl font-bold mb-4'>{title}</h1>
      <p className='mb-4'>{description}</p>
      <div>{CTA}</div>
    </section>
  );
}
