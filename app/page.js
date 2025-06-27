import React from "react";
import {
  Book,
  Sparkles,
  Lock,
  Calendar,
  ChevronRight,
  BarChart2,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TestimonialCarousel from "@/components/testimonial-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { getDailyPrompt } from "@/actions/public";
import faqs from "@/data/faqs";
import { ThemeProvider } from "next-themes";
import Image from 'next/image';

const features = [
  {
    icon: Book,
    title: "AI-Powered Writing Suggestions",
    description:
      "Stuck on what to write? Get context-aware, personalized suggestions from Gemini AI to keep your journaling flowing.",
  },
  {
    icon: Sparkles,
    title: "Image to Text Conversion",
    description:
      "Upload a photo of handwritten or printed text and let Gemini AI extract it directly into your journal entry.",
  },
  {
    icon: BarChart2,
    title: "Mood & Sentiment Analytics",
    description:
      "Track your emotional journey with mood detection, sentiment analysis, and beautiful visualizations of your progress.",
  },
  {
    icon: FileText,
    title: "Daily Reflection Prompts",
    description:
      "Get inspired every day with unique, thought-provoking prompts to spark deeper self-reflection.",
  }
];

export default async function LandingPage() {
  const advice = await getDailyPrompt();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
    >
      <div className="relative container mx-auto px-4 pt-16 pb-16">
        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl gradient-title mb-6">
            Welcome to Mindly.<br />Your AI-Powered Journal
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-orange-800 dark:text-orange-500 font-serif italic font-medium leading-relaxed">
  Let Mindly inspire your writing, analyze your moods, and help you reflect deeper—powered by cutting-edge AI. Capture your thoughts, extract text from images, and get smart suggestions, all in a beautiful, secure space.
</p>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-50 via-transparent to-transparent pointer-events-none z-10" />
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 max-full mx-auto">
              <div className="border-b border-orange-100 dark:border-zinc-700 pb-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span className="text-orange-900 dark:text-orange-200 font-medium">
                   Today&apos;s Entry
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-200 dark:bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-orange-300 dark:bg-zinc-600" />
                  <div className="h-3 w-3 rounded-full bg-orange-400 dark:bg-zinc-500" />
                </div>
              </div>
              <div className="space-y-4 p-4">
                <h3 className="text-xl font-semibold text-orange-900 dark:text-orange-200">
                  {advice ? advice : "My Thoughts Today"}
                </h3>
                <Skeleton className="h-4 bg-orange-100 dark:bg-zinc-800 rounded w-3/4" />
                <Skeleton className="h-4 bg-orange-100 dark:bg-zinc-800 rounded w-full" />
                <Skeleton className="h-4 bg-orange-100 dark:bg-zinc-800 rounded w-2/3" />
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button
                variant="journal"
                className="px-8 py-6 rounded-full flex items-center gap-2"
              >
                Start Writing <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                variant="outline"
                className="px-8 py-6 rounded-full border-orange-600 text-orange-600 hover:bg-orange-100"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <section
          id="features"
          className="mt-24 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="p-6">
                <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-xl text-orange-600 mb-2">
                  {feature.title}
                </h3>
                <p className="text-orange-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <div className="space-y-24 mt-24">
          {/* Feature 1: Image to Text Conversion */}
          <div className="grid md:grid-cols-2 gap-12 md:flex-row-reverse">
            <div className="space-y-6 md:order-2">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600">
                Image to Text Conversion
              </h3>
              <p className="text-lg text-orange-700">
                Upload a photo of handwritten or printed text and let Gemini AI extract it directly into your journal entry—perfect for digitizing notes or capturing inspiration on the go.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <span>Drag & drop image upload</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <span>Instant AI-powered text extraction</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 border border-orange-100 dark:border-zinc-700 md:order-1">
              <div className="flex justify-center mb-8">
              <video
  autoPlay
  muted
  playsInline
  loop
    className="block dark:hidden"
>
        <source src="/imageToTextVideo_light.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
  autoPlay
  muted
  playsInline
  loop
  className="hidden dark:block"
>
        <source src="/imageToTextVideo.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
              </div>
            </div>
          </div>
          {/* Feature 2: AI-Powered Writing Suggestions */}
          <div className="grid md:grid-cols-2 gap-12 ">
            <div className="space-y-6">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Book className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600">
                AI-Powered Writing Suggestions
              </h3>
              <p className="text-lg text-orange-700">
                Stuck on what to write? Get context-aware, personalized suggestions from Gemini AI to keep your journaling flowing and never face writer's block again.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <span>One-click AI suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400" />
                  <span>Context-aware and personalized</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 border border-orange-100 dark:border-zinc-700 md:order-1">
              <div className="flex justify-center mb-8">
              <video
  autoPlay
  muted
  playsInline
  loop
    className="block dark:hidden"
>
        <source src="/suggestionVideo_light.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
  autoPlay
  muted
  playsInline
  loop
  className="hidden dark:block"
>
        <source src="/suggestionVideo.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
              </div>
            </div>
          </div>
          {/* Feature 3: Mood & Sentiment Analytics */}
          <div className="grid md:grid-cols-2 gap-12 md:flex-row-reverse">
            <div className="space-y-6 md:order-2">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600">
              Mood & Sentiment Analytics
              </h3>
              <p className="text-lg text-orange-700">
              Track your emotional journey with mood detection, sentiment analysis, and beautiful visualizations of your progress.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-orange-400" />
    <span>Automatic mood detection</span>
  </li>
  <li className="flex items-center gap-2">
    <div className="h-2 w-2 rounded-full bg-orange-400" />
    <span>Sentiment analysis</span>
  </li>
</ul>
            </div>
            <div className="space-y-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 border border-orange-100 dark:border-zinc-700 md:order-1">
              <div className="flex justify-center mb-8">
                <img
                  src="/moodTracking_light.png"
                  alt="Mood Tracking Light"
                  className="block dark:hidden"
                  width={400}
                  height={300}
                />
                <img
                  src="/moodTracking_dark.png"
                  alt="Mood Tracking Dark"
                  className="hidden dark:block"
                  width={400}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <TestimonialCarousel />

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-orange-700 mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-orange-600 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-orange-700">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mt-24">
          <Card className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-orange-900 mb-6">
                Start Reflct-ing on Your Journey Today
              </h2>
              <p className="text-lg text-orange-700 mb-8 max-w-2xl mx-auto">
                Join thousands of writers who have already discovered the power of
                digital journaling.
              </p>
              <Button size="lg" variant="journal" className="animate-bounce">
                Get Started for Free <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
