import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building, Briefcase as BriefcaseIcon, Handshake as PartnerIcon, ArrowRight, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const partnershipTypes = [
	{
		title: 'For Individuals',
		icon: Users,
		description:
			'Join our mission personally through prayer, volunteering in Sierra Leone or Oregon, advocacy, or financial support. Discover how your unique gifts can make a difference.',
		link: '/partnership/individuals',
		imageUrl:
			'https://media.istockphoto.com/id/2099408907/photo/smiling-young-businessman-standing-with-his-arms-crossed-against-an-office-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=N0rshqVGbuvJ6zFWKLzkwbulYEqqx1mtWzu_eSSOQXE=',
		dataAiHint: 'person volunteering sierra leone',
	},
	{
		title: 'For Churches',
		icon: Building,
		description:
			'Partner your congregation with EDM to expand missions in Sierra Leone and engage with our Oregon network. Mobilize members for impactful outreach.',
		link: '/partnership/churches',
		imageUrl:
			'https://images.unsplash.com/photo-1560253226-26f367c49ae2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWZyaWNhJTIwY2h1cmNofGVufDB8fDB8fHww',
		dataAiHint: 'church congregation freetown',
	},
	{
		title: 'For Organizations & Businesses',
		icon: BriefcaseIcon,
		description:
			'Align your organization with a cause that brings hope to Sierra Leone and fosters US-SL collaboration. Explore sponsorships and engagement.',
		link: '/partnership/organizations',
		imageUrl:
			'https://media.istockphoto.com/id/1407285659/photo/multiethnic-young-and-middle-aged-businesspeople-engaged-in-group-meeting.webp?a=1&b=1&s=612x612&w=0&k=20&c=kfzDX6VEwfalzyfpiXpdL5jHbLzTrCUjd3nQiSXE2dg=',
		dataAiHint: 'business meeting collaboration',
	},
];

export default function GetInvolvedPartnerPage() {
	return (
		<div className="space-y-12 md:space-y-16">
			<PageHeader
				title="Partner With EDM"
				subtitle="Together, we can amplify our impact in Sierra Leone and Oregon through Evangelism, Discipleship, and Missions."
				icon={PartnerIcon}
			/>
			<section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
				<div className="space-y-3 md:space-y-4">
					<SectionTitle title="Why Your Partnership Matters" />
					<p className="text-base sm:text-lg text-muted-foreground">
						At EDM, we believe that collaboration is key to fulfilling the Great
						Commission in Sierra Leone and extending our reach through vital
						partnerships in Oregon. Partnerships enable us to expand, deepen our
						impact, and bring the hope of the Gospel to more communities.
					</p>
					<p className="text-base sm:text-lg text-muted-foreground">
						When you partner with EDM, you become an integral part of a movement
						dedicated to transforming lives in West Africa and the US. Your
						support, whether through prayer, resources, or active involvement,
						fuels our ability to evangelize, disciple, and serve those in need.
					</p>
				</div>
				<div className="rounded-lg overflow-hidden shadow-xl h-64 sm:h-80 relative">
					<Image
						src="https://media.istockphoto.com/id/96653688/photo/handshake.webp?a=1&b=1&s=612x612&w=0&k=20&c=2o15a4X4zTScv56ipJaem6iV5jcNqnu-n3IRm8Eys-o="
						alt="Diverse hands collaborating for Sierra Leone and Oregon"
						layout="fill"
						objectFit="cover"
						className="object-cover w-full h-full"
						data-ai-hint="collaboration handshake partnership"
					/>
				</div>
			</section>
			<SectionTitle
				title="Explore Partnership Opportunities"
				subtitle="Find the best fit for you or your organization to impact Sierra Leone & Oregon"
				className="text-center"
			/>
			<div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
				{partnershipTypes.map((opportunity) => (
					<Card
						key={opportunity.title}
						className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
						<div className="relative w-full h-48 sm:h-56">
							<Image
								src={opportunity.imageUrl}
								alt={opportunity.title}
								layout="fill"
								objectFit="cover"
								data-ai-hint={opportunity.dataAiHint}
								className="rounded-t-lg"
							/>
						</div>
						<CardHeader className="items-center text-center p-4">
							<div className="p-3 bg-primary/10 rounded-full mb-2 sm:mb-3 w-fit">
								<opportunity.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
							</div>
							<CardTitle className="text-lg sm:text-xl md:text-2xl">
								{opportunity.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-grow text-center p-4 pt-0">
							<p className="text-muted-foreground text-xs sm:text-sm mb-4">
								{opportunity.description}
							</p>
						</CardContent>
						<CardContent className="pt-2 sm:pt-4 pb-4 sm:pb-6 text-center border-t">
							<Link href={opportunity.link} legacyBehavior>
								<Button className="w-full sm:w-auto text-xs sm:text-sm">
									Learn More{' '}
									<ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
								</Button>
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
			<section className="text-center bg-card p-6 md:p-8 lg:p-12 rounded-lg shadow-lg mt-8 sm:mt-12">
				<SectionTitle
					title="Let's Connect"
					subtitle="Ready to explore how we can partner for Sierra Leone and Oregon?"
					className="text-center"
				/>
				<p className="text-base sm:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8">
					We are excited to discuss how your unique gifts, resources, or
					organizational goals can align with EDM's mission. Reach out to our
					partnership team to start a conversation.
				</p>
				<Link href="/contact" legacyBehavior>
					<Button size="default" className="w-full sm:w-auto text-sm sm:text-base">
						<Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contact Us
					</Button>
				</Link>
			</section>
		</div>
	);
}
