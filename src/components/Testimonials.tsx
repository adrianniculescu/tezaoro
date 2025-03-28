
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

const Testimonial = ({ content, author, role, avatar }: TestimonialProps) => (
  <Card className="glass-card bg-card p-6 relative">
    <Quote className="absolute top-4 right-4 h-10 w-10 text-primary/20" />
    <p className="text-lg mb-6">{content}</p>
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={avatar} />
        <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{author}</h4>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </Card>
);

const Testimonials = () => {
  const testimonials = [
    {
      content: "Tezaoro has completely transformed how I approach trading. The AI algorithms have given me consistent returns that I never thought possible.",
      author: "Alex Morgan",
      role: "Hedge Fund Manager",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      content: "As someone new to algorithmic trading, I was skeptical. But the results speak for themselves. I've seen a 34% increase in my portfolio in just 6 months.",
      author: "Sarah Chen",
      role: "Retail Investor",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      content: "The risk management features are what truly sets Tezaoro apart. I can sleep at night knowing my investments are protected by sophisticated AI models.",
      author: "Michael Johnson",
      role: "Financial Advisor",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg"
    },
  ];
  
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-tezaoro-900/20 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of traders already benefiting from our platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
