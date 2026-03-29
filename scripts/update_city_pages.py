#!/usr/bin/env python3
"""Update remaining city service area pages to match production layout."""
import os

BASE = r'C:\Users\admin\hamilton-exteriors'

def make_page(city, county, adjective, tagline1, tagline2, p1, p2, p3, p4, feat1_t, feat1_d, feat2_t, feat2_d, feat3_t, feat3_d):
    return f'''---
import Layout from '../../../layouts/Layout.astro';
import AnnouncementBar from '../../../components/AnnouncementBar.astro';
import Navbar from '../../../components/Navbar.astro';
import Hero from '../../../components/Hero.astro';
import LogoSlider from '../../../components/LogoSlider.astro';
import FAQ from '../../../components/FAQ.astro';
import ContactUs from '../../../components/ContactUs.astro';
import Footer from '../../../components/Footer.astro';

const city = '{city}';
const county = '{county}';
const adjective = '{adjective}';
---

<Layout
  title={{`${{adjective}} ADU Contractors in ${{city}}, CA | Hamilton Exteriors`}}
  description={{`Hamilton Exteriors provides ${{adjective.toLowerCase()}} ADU contractors in ${{city}}, CA. Expert design, permits, and construction.`}}
>
  <AnnouncementBar />
  <Navbar />
  <Hero
    formTitle={{`Get a FREE Estimate in ${{city}}`}}
    headline={{`${{adjective}} ADU Contractors in ${{city}}, CA`}}
  />
  <LogoSlider />

  <section class="w-full bg-white py-16 md:py-20">
    <div class="mx-auto max-w-[1200px] px-5">
      <h2 style="font-family: 'THE BOLD FONT (FREE VERSION)', 'Oswald', sans-serif; font-size: clamp(28px, 4vw, 40px); line-height: 1.2; font-weight: 400; color: rgb(13, 43, 29); text-transform: uppercase; margin-bottom: 16px;">
        Why Choose Hamilton Exteriors as Your {{adjective}} ADU Contractors in {{city}}, CA?
      </h2>
      <h3 style="font-family: 'DM Sans', sans-serif; font-size: 22px; font-weight: 500; color: rgb(13, 43, 29); margin-bottom: 20px;">{tagline1}</h3>
      <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; line-height: 30px; color: rgb(104, 104, 105); margin-bottom: 16px;">{p1}</p>
      <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; line-height: 30px; color: rgb(104, 104, 105); margin-bottom: 16px;">{p2}</p>
      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <div style="padding: 20px; border: 1px solid rgb(230,230,230); border-radius: 8px;">
          <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 700; color: rgb(13, 43, 29); margin-bottom: 8px;">{feat1_t}</p>
          <p style="font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 26px; color: rgb(104, 104, 105);">{feat1_d}</p>
        </div>
        <div style="padding: 20px; border: 1px solid rgb(230,230,230); border-radius: 8px;">
          <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 700; color: rgb(13, 43, 29); margin-bottom: 8px;">{feat2_t}</p>
          <p style="font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 26px; color: rgb(104, 104, 105);">{feat2_d}</p>
        </div>
        <div style="padding: 20px; border: 1px solid rgb(230,230,230); border-radius: 8px;">
          <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 700; color: rgb(13, 43, 29); margin-bottom: 8px;">{feat3_t}</p>
          <p style="font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 26px; color: rgb(104, 104, 105);">{feat3_d}</p>
        </div>
        <div style="padding: 20px; border: 1px solid rgb(230,230,230); border-radius: 8px;">
          <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; font-weight: 700; color: rgb(13, 43, 29); margin-bottom: 8px;">$0 Down Financing Available</p>
          <p style="font-family: 'DM Sans', sans-serif; font-size: 15px; line-height: 26px; color: rgb(104, 104, 105);">Flexible financing options make it easy to start your {city} ADU project without a large upfront investment.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="w-full bg-cream py-16 md:py-20">
    <div class="mx-auto max-w-[1200px] px-5">
      <h2 style="font-family: 'THE BOLD FONT (FREE VERSION)', 'Oswald', sans-serif; font-size: clamp(28px, 4vw, 40px); line-height: 1.2; font-weight: 400; color: rgb(13, 43, 29); text-transform: uppercase; margin-bottom: 16px;">
        Why {{adjective}} ADU Contractors in {{city}}, CA Are Essential
      </h2>
      <h3 style="font-family: 'DM Sans', sans-serif; font-size: 22px; font-weight: 500; color: rgb(13, 43, 29); margin-bottom: 20px;">{tagline2}</h3>
      <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; line-height: 30px; color: rgb(104, 104, 105); margin-bottom: 16px;">{p3}</p>
      <p style="font-family: 'DM Sans', sans-serif; font-size: 17px; line-height: 30px; color: rgb(104, 104, 105);">{p4}</p>
    </div>
  </section>

  <FAQ />
  <ContactUs />
  <Footer />
</Layout>
'''

pages = [
    ('alameda-county-ca/hayward-ca.astro', 'Hayward', 'Alameda County', 'Expert', 'Skilled. Dependable. Proven.', 'Space. Growth. Reliability.',
     'Hamilton Exteriors delivers expert ADU contractors in Hayward, CA to homeowners seeking efficient, well-designed accessory dwelling units. From planning and permits to construction and final inspection, our team handles every step with precision.',
     'Our expert contractors understand Hayward\'s specific zoning requirements and building codes, ensuring your ADU project moves smoothly from concept to completion.',
     'Hayward\'s growing demand for housing and proximity to BART stations make ADUs an excellent investment. A well-built ADU generates steady rental income while adding significant value to your property.',
     'Working with expert ADU contractors ensures your unit is built to code, passes all inspections, and delivers lasting value for Hayward homeowners.',
     'Comprehensive ADU Services', 'Expert ADU contractors in Hayward manage the full process from design to permitting and construction.',
     'Hayward Code Expertise', 'Deep knowledge of Hayward\'s zoning, setbacks, and permit requirements ensures smooth approval.',
     'Quality Craftsmanship', 'Premium materials and skilled construction meeting the highest standards for Hayward homeowners.'),

    ('alameda-county-ca/san-leandro-ca.astro', 'San Leandro', 'Alameda County', 'Reliable', 'Efficient. Skilled. Reliable.', 'Value. Comfort. Compliance.',
     'Hamilton Exteriors is your team of reliable ADU contractors in San Leandro, CA. We specialize in designing and building accessory dwelling units that enhance property value and provide additional living space.',
     'Our reliable contractors bring consistency and professionalism to every San Leandro ADU project with transparent pricing and clear timelines.',
     'San Leandro\'s central East Bay location and affordable housing stock make it ideal for ADU investment. Rental demand remains strong.',
     'Reliable ADU contractors ensure your project stays on track and on budget. Our track record gives San Leandro homeowners confidence.',
     'Local Expertise', 'Years of experience working with San Leandro codes and zoning rules.',
     'On-Time Delivery', 'We stick to timelines and budgets, keeping you informed at every stage.',
     'Full Permit Management', 'We handle all San Leandro permits and inspections for you.'),

    ('contra-costa-county-ca/antioch-ca.astro', 'Antioch', 'Contra Costa County', 'Professional', 'Dedicated. Skilled. Efficient.', 'Safety. Precision. Confidence.',
     'Hamilton Exteriors is your team of professional ADU contractors in Antioch, CA. We specialize in designing and constructing accessory dwelling units that maximize your property\'s potential.',
     'Our professional contractors manage every phase of your Antioch ADU project with expertise and attention to detail.',
     'Antioch\'s growing population and affordable land make it one of the best East Bay cities for ADU construction with strong rental demand.',
     'Professional ADU contractors bring the expertise needed to navigate permits and deliver a finished unit that meets all standards.',
     'Streamlined Execution', 'Professional ADU contractors in Antioch manage the entire process with precision.',
     'Antioch Code Compliance', 'We navigate Antioch\'s specific zoning and building requirements.',
     'Transparent Communication', 'Regular updates and clear timelines throughout your project.'),

    ('contra-costa-county-ca/concord-ca.astro', 'Concord', 'Contra Costa County', 'Trusted', 'Expert. Dependable. Local.', 'Comfort. Functionality. Growth.',
     'Hamilton Exteriors is your source for trusted ADU contractors in Concord, CA. We specialize in custom accessory dwelling units that enhance property value.',
     'Our trusted contractors bring deep local knowledge and proven construction methods to every Concord ADU project.',
     'Concord\'s central location, BART access, and family-friendly neighborhoods make it ideal for ADU investment.',
     'Trusted ADU contractors deliver projects that pass inspection the first time. Our reputation is built on quality.',
     'Concord Regulations Knowledge', 'Experienced in navigating local zoning, permits, and building codes.',
     'Custom Design Solutions', 'Every Concord ADU designed to fit your property and specific needs.',
     'Licensed and Insured', 'Fully licensed (CA #1082377) and insured for your protection.'),

    ('contra-costa-county-ca/richmond-ca.astro', 'Richmond', 'Contra Costa County', 'Experienced', 'Proven. Skilled. Reliable.', 'Knowledge. Value. Confidence.',
     'Hamilton Exteriors is home to experienced ADU contractors in Richmond, CA who bring years of expertise to every project.',
     'Our experienced contractors have completed numerous ADU projects across Richmond\'s diverse neighborhoods.',
     'Richmond\'s waterfront revitalization, BART connectivity, and affordable housing make ADUs a high-return investment.',
     'Experienced ADU contractors know how to anticipate challenges and deliver exceptional results.',
     'Strong Track Record', 'Numerous completed projects from small backyard units to full-size detached ADUs.',
     'Richmond Zoning Expertise', 'Deep understanding of Richmond\'s ADU ordinance and transit-oriented zones.',
     'Quality Materials', 'Premium construction materials and proven methods for lasting results.'),

    ('contra-costa-county-ca/san-ramon-ca.astro', 'San Ramon', 'Contra Costa County', 'Skilled', 'Creative. Reliable. Precise.', 'Function. Safety. Value.',
     'Hamilton Exteriors is your trusted team of skilled ADU contractors in San Ramon, CA. We provide expert design and construction for accessory dwelling units.',
     'Our skilled contractors excel at projects requiring precision and attention to detail with premium finishes.',
     'San Ramon\'s excellent schools, safe neighborhoods, and strong property values make ADUs an ideal investment.',
     'Skilled ADU contractors bring precision and craftsmanship needed for San Ramon\'s distinctive neighborhoods.',
     'Complex Build Expertise', 'Skilled ADU contractors excel at challenging projects including hillside lots.',
     'Premium Design Standards', 'Designs matching San Ramon\'s upscale aesthetic with modern amenities.',
     'Efficient Management', 'Streamlined processes minimize disruption during construction.'),

    ('contra-costa-county-ca/walnut-creek-ca.astro', 'Walnut Creek', 'Contra Costa County', 'Dedicated', 'Focused. Reliable. Trusted.', 'Stability. Comfort. Value.',
     'Hamilton Exteriors is your trusted choice for dedicated ADU contractors in Walnut Creek, CA. We provide full-service design and construction.',
     'Our dedicated contractors prioritize client goals throughout every phase of the project.',
     'Walnut Creek\'s vibrant downtown, top-rated schools, and strong real estate market make ADUs an outstanding investment.',
     'Dedicated ADU contractors deliver consistent quality because they treat every project as their own.',
     'Client-Centered Approach', 'Prioritizing homeowner goals and preferences throughout the entire project.',
     'Walnut Creek Design Expertise', 'ADUs designed to complement established neighborhoods.',
     'Complete Transparency', 'Detailed cost breakdowns and no surprise charges.'),

    ('marin-county-ca/larkspur-ca.astro', 'Larkspur', 'Marin County', 'Premier', 'Elite. Reliable. Proven.', 'Quality. Trust. Value.',
     'Hamilton Exteriors is the premier choice for ADU contractors in Larkspur, CA. Our team specializes in high-quality accessory dwelling units.',
     'Our premier contractors deliver exceptional craftsmanship and attention to detail on every Larkspur ADU project.',
     'Larkspur\'s prime Marin location, ferry access, and high property values make ADUs a premium investment.',
     'Premier ADU contractors bring expertise and materials needed for the high standards Larkspur homeowners expect.',
     'Unmatched Craftsmanship', 'Precision and superior workmanship on every project.',
     'Larkspur-Specific Expertise', 'Knowledge of unique zoning, hillside codes, and design guidelines.',
     'Seamless Integration', 'Designs that blend naturally with Larkspur\'s architectural character.'),

    ('marin-county-ca/mill-valley-ca.astro', 'Mill Valley', 'Marin County', 'Innovative', 'Creative. Modern. Practical.', 'Creativity. Progress. Value.',
     'Hamilton Exteriors leads in innovative ADU contractors in Mill Valley, CA. We bring creativity and expertise together for exceptional accessory dwelling units.',
     'Our innovative approach combines modern design with practical construction for ADUs that are beautiful and functional.',
     'Mill Valley\'s natural beauty, proximity to San Francisco, and strong community make ADUs a premium investment.',
     'Innovative ADU contractors find creative solutions where others see obstacles. Our projects demonstrate what\'s possible.',
     'Unique Design Solutions', 'Customized layouts that maximize limited spaces on Mill Valley properties.',
     'Modern Building Techniques', 'Energy-efficient construction with sustainable materials.',
     'Hillside Expertise', 'Specialized foundation solutions for Mill Valley\'s challenging terrain.'),

    ('marin-county-ca/novato-ca.astro', 'Novato', 'Marin County', 'Affordable', 'Budget-Friendly. Reliable. Smart.', 'Value. Access. Opportunity.',
     'Hamilton Exteriors is the trusted choice for affordable ADU contractors in Novato, CA. We build cost-effective accessory dwelling units.',
     'Our affordable approach focuses on smart material selection, efficient construction, and transparent pricing.',
     'Novato\'s larger lot sizes and more affordable land make it ideal for ADU construction with favorable investment returns.',
     'Affordable ADU contractors make homeownership goals achievable. Quality construction doesn\'t require a premium price tag.',
     'Transparent Pricing', 'Clear cost breakdowns and upfront estimates with no hidden fees.',
     'Cost-Effective Design', 'Smart floor plans maximizing space while keeping costs manageable.',
     'Value Engineering', 'Identifying savings without sacrificing quality or durability.'),

    ('marin-county-ca/san-rafael-ca.astro', 'San Rafael', 'Marin County', 'Expert', 'Precise. Innovative. Trusted.', 'Knowledge. Efficiency. Security.',
     'Hamilton Exteriors is your trusted choice for expert ADU contractors in San Rafael, CA. We specialize in accessory dwelling units in Marin County\'s largest city.',
     'Our expert contractors bring deep knowledge of San Rafael\'s building codes, zoning, and neighborhood characteristics.',
     'San Rafael\'s central Marin location, transit access, and diverse neighborhoods create strong ADU demand.',
     'Expert ADU contractors bring specialized knowledge that general contractors don\'t have.',
     'Specialized ADU Knowledge', 'Deep expertise in ADU-specific construction from foundations to finishes.',
     'San Rafael Code Mastery', 'Understanding of ADU ordinance, design review, and permitting.',
     'Proven Quality Standards', 'Every ADU meets or exceeds local building standards.'),
]

for args in pages:
    filepath = os.path.join(BASE, 'src', 'pages', 'service-areas', args[0])
    # Check if already updated
    try:
        with open(filepath) as f:
            if len(f.readlines()) > 50:
                print(f"SKIP (already updated): {args[0]}")
                continue
    except:
        pass

    content = make_page(args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9], args[10], args[11], args[12], args[13], args[14], args[15])
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"WROTE: {args[0]}")

print("\nAll city pages updated!")
