// Testimonials Section Component
export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      role: 'Software Developer',
      text: 'Found my dream job through WorkersBD. Great platform with quality listings!',
      rating: 5
    },
    {
      id: 2,
      name: 'Fatima Khan',
      role: 'HR Manager',
      text: 'We found excellent candidates quickly. Highly recommend WorkersBD.',
      rating: 5
    },
    {
      id: 3,
      name: 'Rajib Hossain',
      role: 'Job Seeker',
      text: 'Easy to use interface and responsive customer support. Perfect!',
      rating: 4
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">What Our Users Say</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
