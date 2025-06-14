
import PageHeader from '@/components/shared/page-header';
import SectionTitle from '@/components/shared/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollText, CheckCircle } from 'lucide-react';

const beliefs = [
  { title: 'The Scriptures', text: 'We believe the Bible, consisting of the Old and New Testaments, is the verbally inspired Word of God, inerrant in the original writings, and the supreme and final authority in faith and life.' },
  { title: 'God', text: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit, co-equal in power and glory, having the same attributes and perfections.' },
  { title: 'Jesus Christ', text: 'We believe in the deity of our Lord Jesus Christ, in His virgin birth, in His sinless life, in His miracles, in His vicarious and atoning death through His shed blood, in His bodily resurrection, in His ascension to the right hand of the Father, and in His personal return in power and glory.' },
  { title: 'The Holy Spirit', text: 'We believe that the Holy Spirit is a person who convicts the world of sin, righteousness, and judgment; and that He is the supernatural agent in regeneration, baptizing all believers into the body of Christ, indwelling and sealing them unto the day of redemption.' },
  { title: 'Salvation', text: 'We believe that salvation is the gift of God brought to man by grace and received by personal faith in the Lord Jesus Christ, whose precious blood was shed on Calvary for the forgiveness of our sins.' },
  { title: 'The Church', text: 'We believe that the Church, which is the body and espoused bride of Christ, is a spiritual organism made up of all born-again persons of this present age. We believe in the local church, an assembly of believers, organized for worship, service, and the spread of the Gospel.' },
  { title: 'The Great Commission', text: 'We believe that it is the explicit command of Christ to His disciples to go and make disciples of all nations, baptizing them and teaching them to observe all He has commanded (Matthew 28:18-20).' },
  { title: 'Last Things', text: 'We believe in the personal, imminent return of Christ for His saints, and His subsequent return to earth with His saints to establish His millennial kingdom. We believe in the bodily resurrection of both the saved and the lost; they that are saved unto the resurrection of life, and they that are lost unto the resurrection of damnation.' },
];

export default function WhatWeBelievePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="What We Believe"
        subtitle="Our core doctrinal statements that guide EDM's mission and work."
        icon={ScrollText}
      />
      <div className="grid md:grid-cols-2 gap-8">
        {beliefs.map((belief, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-primary">
                <CheckCircle className="h-6 w-6 mr-3 text-green-500" />
                {belief.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{belief.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
