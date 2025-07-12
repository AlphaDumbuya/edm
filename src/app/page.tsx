import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import SectionTitle from '@/components/shared/section-title';
import { ArrowRight, BookOpenText, HeartHandshake, HelpingHand, Milestone, School, Target, } from 'lucide-react';
import BlogPostCard from '@/components/blog/blog-post-card';
import { cn } from '@/lib/utils';
import { getAllNewsArticles } from '@/lib/db/news';
import { getAllBlogPosts } from '@/lib/db/blogPosts';

export const dynamic = "force-dynamic";

const pillars: Pillar[] = [
	{
		title: 'Evangelism',
		description: 'Spreading the message of hope to unreached communities.',
		icon: BookOpenText,
		href: '/ministries/evangelism',
	},
	{
		title: 'Discipleship',
		description: 'Training believers to become strong and mature in their faith.',
		icon: School,
		href: '/ministries/discipleship',
	},
	{
		title: 'Missions',
		description: 'Serving communities through outreach and love.',
		icon: HeartHandshake,
		href: '/the-mission',
	},
];

interface Pillar {
	title: string;
	description: string;
	icon: React.ElementType;
	href: string;
}

// Define a type for blog posts
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  published: boolean;
  imageUrl?: string | null;
  author?: { name: string | null } | null;
}

function stripHtml(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '');
}

export default async function Home() {
	const recentNews = (await getAllNewsArticles(true)).slice(0, 2);
	// Fetch blog posts directly from the server function
	let blogPosts: BlogPost[] = [];
	try {
		const { blogPosts: posts } = await getAllBlogPosts({ publishedOnly: true, limit: 2, orderBy: { createdAt: 'desc' } });
		blogPosts = posts || [];
	} catch (e) {
		blogPosts = [];
	}

	return (
        <div className="space-y-12 md:space-y-16">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary/10 via-background to-secondary/10 py-12 md:py-20 lg:py-28 rounded-lg shadow-lg overflow-hidden">
				<div className="absolute inset-0">
					<Image
						src="https://images.unsplash.com/photo-1572061486195-d811e12d0a10?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGNocmlzdGlhbml0eXxlbnwwfHwwfHw%3D"
						alt="Evangelism and community work in Sierra Leone"
						fill
						className="object-cover opacity-40"
						priority
					/>
					<div className="absolute inset-0 bg-black/60" />
				</div>
				<div className="container mx-auto px-4 text-center relative z-10">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 md:mb-6">
						Welcome to <span className="text-primary">EDM</span>
					</h1>
					<p className="text-sm sm:text-md md:text-lg lg:text-xl text-gray-200 max-w-xl md:max-w-3xl mx-auto mb-6 md:mb-8">
						Evangelism, Discipleship, Missions: Spreading hope, building faith, and
						transforming lives in Sierra Leone, West Africa, with vital partnerships in
						Oregon, USA.
					</p>
					<div className="flex justify-center items-center space-x-3">
						<Button asChild>
							<Link
                                href="/about"
                                className={cn(
									buttonVariants({ variant: 'default', size: 'sm' }),
									'flex items-center gap-1 text-xs sm:text-sm md:text-base whitespace-nowrap'
								)}
                                >
								<span className="flex items-center gap-1">
									Our Story <ArrowRight className="ml-1 h-4 w-4" />
								</span>
							</Link>
						</Button>
						<Link href="/donate">
							<Button
								size="sm"
								className="bg-transparent border text-primary-foreground flex items-center gap-1 whitespace-nowrap"
							>
								Support EDM <HelpingHand className="ml-1 h-4 w-4" />
							</Button>
						</Link>
					</div>
				</div>
			</section>
            {/* Core Pillars */}
            <section>
				<SectionTitle
					title="Our Three Pillars"
					subtitle="The foundation of EDM's ministry in Sierra Leone"
				/>
				<div className="grid md:grid-cols-3 gap-6 md:gap-8">
					{pillars.map(({ title, description, icon: Icon, href }) => (
						<Card
							key={title}
							className="text-center shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
						>
							<CardHeader className="p-4 sm:p-6">
								<div className="mx-auto bg-primary/10 p-3 sm:p-4 rounded-full w-fit mb-3">
									<Icon className="h-10 w-10 text-primary" />
								</div>
								<CardTitle className="text-xl sm:text-2xl">
									{title}
								</CardTitle>
							</CardHeader>
							<CardContent className="p-4 sm:p-6 flex-grow">
								<p className="text-muted-foreground text-sm">
									{description}
								</p>
							</CardContent>
							<CardFooter className="p-4 sm:p-6 pt-2 border-t flex justify-center">
								<Link
									href={href}
									className={cn(buttonVariants({ variant: 'link' }), 'text-sm')}
								>
									<span
										className={cn(
											buttonVariants({ variant: 'link' }),
											'text-sm whitespace-nowrap'
										)}
									>
										Learn More{' '}
										<ArrowRight className="ml-1 h-3 w-3" />
									</span>
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
            {/* Mission Statement & Motto */}
            <section className="bg-primary/5 p-6 md:p-8 lg:p-12 rounded-lg shadow-lg">
				<div className="text-center max-w-3xl mx-auto">
					<SectionTitle title="Our Guiding Words" />
					<div className="mb-6 md:mb-8">
						<h3 className="text-2xl font-semibold text-primary mb-2">
							Purpose Statement
						</h3>
						<blockquote className="text-lg italic text-foreground border-l-4 border-primary pl-4 py-2">
							"In our acts of obedience and worship to God, we will go out and
							share the good news to the unbelievers, train them to maturity so
							they will train others."
						</blockquote>
					</div>
					<div>
						<h3 className="text-2xl font-semibold text-primary mb-2">Motto</h3>
						<p className="text-lg italic text-foreground">
							"Love God and love others."
						</p>
					</div>
				</div>
			</section>
            {/* Vision */}
            <section>
				<SectionTitle
					title="Our Vision for EDM"
					subtitle="Building a legacy of faith and service"
				/>
				<div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
					<Card className="shadow-lg">
						<CardHeader className="p-6">
							<div className="flex items-center gap-3">
								<Target className="h-8 w-8 text-primary" />
								<CardTitle className="text-xl">
									Campus for Christ in Sierra Leone
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="p-6">
							<p className="text-muted-foreground text-sm mb-4">
								Our long-term vision includes building a dedicated campus for the
								body of Christ in Sierra Leone. This hub will feature a retreat
								center, the EDM Marifa School (now operational), future Bible
								school, lodging, recreation facilities, a chapel, and more.
							</p>
							<div className="relative w-full aspect-video rounded-md overflow-hidden shadow-md flex flex-col items-center justify-center bg-muted">
    <Target className="w-16 h-16 text-primary mb-2" />
    <span className="text-sm text-muted-foreground text-center px-2">Future campus rendering or illustration coming soon</span>
  </div>
						</CardContent>
					</Card>

					<Card className="shadow-md">
						<CardHeader className="p-6">
							<div className="flex items-center gap-3">
								<Milestone className="h-7 w-7 text-primary" />
								<CardTitle className="text-xl">Key Goals</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="text-sm p-6">
							<h4 className="font-semibold mb-2">Short-Term:</h4>
							<ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
								<li>Support the ongoing development of EDM Marifa School.</li>
								<li>Strengthen local and international partnerships.</li>
								<li>Expand discipleship training across rural areas.</li>
							</ul>
							<h4 className="font-semibold mb-2">Long-Term:</h4>
							<ul className="list-disc list-inside text-muted-foreground space-y-1">
								<li>Construct the full EDM Campus in Sierra Leone.</li>
								<li>Establish a Bible college and training institute.</li>
								<li>Develop sustainable outreach and social impact programs.</li>
							</ul>
						</CardContent>
					</Card>
				</div>
			</section>
            {/* News Section */}
            <section>
				<SectionTitle
					title="News & Updates"
					subtitle="Stay informed with the latest from EDM"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
					{recentNews.length === 0 ? (
						<p className="text-muted-foreground">
							No news articles available yet.
						</p>
					) : (
						recentNews.map((post) => (
							<BlogPostCard
								key={post.id}
								itemType="news" // Specify item type as 'news'
								post={{
									slug: post.slug,
									title: post.title,
									date: post.createdAt.toLocaleDateString(),
									author: {
										name: post.author?.name || 'Unknown Author',
									},
									excerpt: stripHtml(post.content).substring(0, 150) + '...',
									imageUrl: post.imageUrl || '',
								}}
							/>
						))
					)}
				</div>
			</section>
            {/* Blog Section */}
            <section>
				<SectionTitle
					title="Latest Blog Posts"
					subtitle="Insights and stories from the EDM community"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{blogPosts.length === 0 ? (
						<p className="text-muted-foreground">No blog posts available yet.</p>
					) : (
						blogPosts.map((post) => (
							<BlogPostCard
								key={post.id}
								itemType="blog"
								post={{
									slug: post.slug,
									title: post.title,
									date: new Date(post.createdAt).toLocaleDateString(),
									author: {
										name: post.author?.name || 'Unknown Author',
									},
									excerpt: stripHtml(post.content).substring(0, 150) + '...',
									imageUrl: post.imageUrl || '',
								}}
							/>
						))
					)}
				</div>
			</section>
        </div>
    );
}