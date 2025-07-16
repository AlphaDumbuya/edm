'use client';

import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, Wrench, Laptop, GraduationCap, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import VolunteerSignupForm from '@/components/volunteer/volunteer-signup-form';
import { Button } from '@/components/ui/button';

const volunteerAreas = [
	{
		title: 'Local Outreach in Sierra Leone',
		icon: Users,
		description:
			'Join our teams in Sierra Leone for evangelism, community service, and supporting local church activities. Short-term and long-term opportunities available.',
		imageUrl:
			'https://plus.unsplash.com/premium_photo-1678836048286-a511c8c07cc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9jYW4lMjBvdXRyZWFjaCUyMHZvbHVudGVlciUyMGluJTIwYWZyaWNhfGVufDB8fDB8fHww',
		dataAiHint: 'africa outreach volunteer'
	},
	{
		title: 'Skills-Based Volunteering (Remote/Local)',
		icon: Laptop,
		description:
			'Offer your professional skills (e.g., IT, graphic design, writing, marketing, accounting) to support EDM\'s operations either remotely or on-site in Sierra Leone/Oregon.',
		imageUrl:
			'https://images.unsplash.com/photo-1744234233590-2d00b3c87444?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2tpbGxzJTIwQmFzZWQlMjBWb2x1bnRlZXJpbmclMjBpbiUyMGFmcmljYXxlbnwwfHwwfHx8MA%3D%3D',
		dataAiHint: 'skills based volunteering'
	},
	{
		title: 'Educational Support in Sierra Leone',
		icon: GraduationCap,
		description: 'Assist with our EDM Marifa School, help with teaching, teacher training, or curriculum development.',
		imageUrl:
			'https://images.unsplash.com/flagged/photo-1579133311477-9121405c78dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RWR1Y2F0aW9uYWwlMjBTdXBwb3J0Vm9sdW50ZWVyaW5nJTIwaW4lMjBhZnJpY2F8ZW58MHx8MHx8fDA%3D',
		dataAiHint: 'education support africa'
	},
	{
		title: 'Practical Help & Maintenance (Sierra Leone)',
		icon: Wrench,
		description:
			'Contribute to building and maintenance projects at our future EDM campus in Sierra Leone, or assist with logistics for equipment and supplies.',
		imageUrl:
			'https://images.unsplash.com/photo-1584731683405-858d4c66e72d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFByYWN0aWNhbCUyMEhlbHAlMjAlMjYlMjBNYWludGVuYW5jZSUyMFZvbHVudGVlcmluZyUyMGluJTIwYWZyaWNhfGVufDB8fDB8fHww',
		dataAiHint: 'practical help africa'
	},
	{
		title: 'Oregon Partnership Support',
		icon: Heart,
		description:
			'Help our Oregon-based team with awareness campaigns, fundraising events, administrative tasks, and coordinating support for Sierra Leone.',
		imageUrl:
			'https://media.istockphoto.com/id/2155462703/photo/architects-and-investors-discuss-real-estate-projects-using-clean-energy-or-solar-cells.webp?a=1&b=1&s=612x612&w=0&k=20&c=rpba0sQ_K_p8v6Z0khsK6aghKTMVf3U3xeKD2vUdfo4=',
		dataAiHint: 'architects meeting investment'
	}
];

export default function VolunteerPage() {
	return (
		<div className="space-y-12">
			<PageHeader
				title="Volunteer with EDM"
				subtitle="Use your God-given talents to serve in Sierra Leone or support our Oregon partnerships."
				icon={Heart}
			/>

			<section className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
				<div className="space-y-4">
					<SectionTitle title="Make a Tangible Difference" />
					<p className="text-base sm:text-lg text-muted-foreground">
						Volunteers are the hands and feet of EDM. Whether you can travel to
						Sierra Leone, offer skills remotely, or support our efforts in Oregon,
						your contribution is invaluable. We seek passionate individuals ready
						to serve and share God's love.
					</p>
					<p className="text-base sm:text-lg text-muted-foreground">
						Explore the various ways you can volunteer and become an active part
						of our mission.
					</p>
				</div>
				<div className="rounded-lg overflow-hidden shadow-xl h-64 md:h-80">
					<Image
						src="https://plus.unsplash.com/premium_photo-1681195079271-cbfd9ba1cbc7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dm9sdW50ZWVyaW5nfGVufDB8fDB8fHww"
						alt="Volunteers making a tangible difference"
						width={600}
						height={400}
						className="object-cover w-full h-full"
						data-ai-hint="volunteering hands community"
					/>
				</div>
			</section>

			<SectionTitle
				title="Volunteer Opportunities"
				subtitle="Find where your skills and passion fit best"
			/>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
				{volunteerAreas.map((area) => (
					<Card
						key={area.title}
						className="shadow-lg hover:shadow-xl transition-shadow flex flex-col"
					>
						<CardHeader className="items-center text-center p-4">
							<div className="p-3 bg-primary/10 rounded-full mb-2 w-fit">
								<area.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
							</div>
							<CardTitle className="text-lg sm:text-xl">
								{area.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="text-center p-4 pt-0 flex-grow">
							<div className="relative w-full h-40 sm:h-48 rounded-md overflow-hidden mb-3">
								<Image
									src={area.imageUrl}
									alt={area.title}
									layout="fill"
									objectFit="cover"
									className="rounded-md"
									data-ai-hint={area.dataAiHint}
								/>
							</div>
							<p className="text-muted-foreground text-sm">
								{area.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<section className="text-center bg-card p-6 md:p-12 rounded-lg shadow-lg mt-12">
				<SectionTitle
					title="Ready to Volunteer?"
					subtitle="Fill out the form below to express your interest"
					className="text-center"
				/>
				<div className="max-w-2xl mx-auto">
					<VolunteerSignupForm />
				</div>
			</section>
			<section className="text-center bg-card p-6 md:p-8 rounded-lg shadow-lg mt-8">
				<SectionTitle
					title="Ready to Make a Personal Impact?"
					className="text-center"
				/>
				<p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-6">
					We&apos;re excited to explore how your passion and skills can align with
					EDM&apos;s mission in Sierra Leone or Oregon. If you have questions or
					want to discuss involvement, please reach out.
				</p>
				<Link href="/contact" legacyBehavior>
					<Button size="lg" className="text-sm sm:text-base">
						<Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" /> Contact Us
					</Button>
				</Link>
			</section>
		</div>
	);
}
