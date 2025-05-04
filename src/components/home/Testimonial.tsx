import { Carousel } from "antd";
import test2 from "../../assets/images/img/test2.jpg";

const Testimonial = () => {
  const testimonials = [
    {
      image: test2,
      quote:
        "They have a huge range of affordable kids and family bikes, in a wide selection of colours.",
      name: "Mr Shoybal",
      title: "Blogger",
    },
    {
      image: "https://avatars.githubusercontent.com/u/112149785?v=4",
      quote:
        "I love this store! Super helpful team and great bikes. Highly recommended for families or pros looking for affordable and quality options.",
      name: "Mr. Jobayer",
      title: "Pro Cyclist",
    },
    {
      image: "https://avatars.githubusercontent.com/u/73853966?v=4",
      quote:
        "Highly recommended for families or pros looking for affordable and quality options.",
      name: "Mr. Sakib",
      title: "Cyclist & Blogger",
    },
    {
      image: "https://img.freepik.com/foto-gratuito/silhouette-di-donne-con-bicicletta-e-bel-cielo_1150-5338.jpg",
      quote:
        "I recommended this site for casuals, looking for affordable and quality product. I am very proud to buy their product!",
      name: "Ms. Afrina",
      title: "Cyclist",
    },
    // Add more testimonials here
  ];

  return (
    <div className="w-full min-h-[55vh] rounded-4xl! shadow-purple-600 shadow-2xl">
      <Carousel
        autoplay
        autoplaySpeed={2000}
        arrows
        fade
        className="min-w-full min-h-[55vh] bg-gradient-to-r from-blue-400 to-purple-600 rounded-4xl"
      >
        {testimonials.map((testimonial, index) => (
          <section
            key={index}
            className="relative isolate overflow-hidden bg-transparent px-6 py-24 sm:py-32 lg:px-8 rounded-4xl w-full min-h-[55vh]!"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,var(--color-indigo-100),white)] opacity-20"></div>
            <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white ring-1 shadow-xl shadow-indigo-600/10 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>

            <div className="mx-auto max-w-2xl lg:max-w-4xl text-center">
              <img
                src={testimonial.image}
                alt="user"
                className="mx-auto h-48 rounded-full object-cover"
              />
              <figure className="mt-10">
                <blockquote className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  <p>“{testimonial.quote}”</p>
                </blockquote>
                <figcaption className="mt-10">
                  <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-fuchsia-900">
                      {testimonial.name}
                    </div>
                    <svg
                      viewBox="0 0 2 2"
                      width="3"
                      height="3"
                      aria-hidden="true"
                      className="fill-gray-900"
                    >
                      <circle cx="1" cy="1" r="1" />
                    </svg>
                    <div className="text-fuchsia-600">{testimonial.title}</div>
                  </div>
                </figcaption>
              </figure>
            </div>
          </section>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonial;
