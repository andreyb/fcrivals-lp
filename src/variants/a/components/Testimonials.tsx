
import React from 'react';
import { Card, CardContent } from './ui/card';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard = ({ quote, name, title }: TestimonialProps) => {
  return (
    <Card className="border border-white/10 bg-secondary/30 backdrop-blur-sm">
      <CardContent className="p-6">
        <p className="text-lg mb-6">"{quote}"</p>
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Sent my mate the head-to-head stats after destroying him 5-0. Man blocked me for a week. 10/10 would flex again.",
      name: "Jake M.",
      title: "Div 1 Player"
    },
    {
      quote: "My flatmate kept claiming he was 'just having an off day'. Pulled up the stats showing I've won 15 of our last 20 matches. Debate settled.",
      name: "Sarah K.",
      title: "Weekend League Warrior"
    },
    {
      quote: "Finally have proof that my brother uses PSG too much. Stats don't lie bro, touch grass.",
      name: "Aiden T.",
      title: "FUT Founder"
    }
  ];

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">fcRivals Users Be Like...</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Here’s how other FC players are ending arguments — and making enemies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              title={testimonial.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
