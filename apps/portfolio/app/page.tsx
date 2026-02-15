"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Mail,
  ArrowUpRight,
  Quote,
  Layout,
  Briefcase,
  Award,
  MapPin,
  Plus,
  Minus,
} from 'lucide-react';
import ContactModal from './components/ContactModal';

type NavLinkProps = { to: string; label: string };
type LensCardProps = { title: string; desc: string; icon: React.ElementType };
type AccordionProjectProps = {
  title: string;
  summary: string;
  challenge: string;
  intervention: string;
  impact: string;
  imageSrc?: string;
  imageCaption?: string;
};
type ProjectCategoryProps = { category: string; description: string; children: React.ReactNode };

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLink = ({ to, label }: NavLinkProps) => (
    <button
      onClick={() => scrollToSection(to)}
      className="text-sm font-medium text-stone-500 hover:text-emerald-900 transition-colors uppercase tracking-widest relative group py-2 font-sans"
    >
      {label}
    </button>
  );

  const LensCard = ({ title, desc, icon: Icon }: LensCardProps) => (
    <div className="bg-stone-50 p-8 border-l-2 border-emerald-800/30 hover:border-emerald-800 transition-colors duration-500 group">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-emerald-800 opacity-60 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
        <h3 className="text-lg font-serif font-bold text-stone-900">{title}</h3>
      </div>
      <p className="text-stone-600 leading-relaxed font-light text-sm">
        {desc}
      </p>
    </div>
  );

  const AccordionProject = ({ title, summary, challenge, intervention, impact, imageSrc, imageCaption }: AccordionProjectProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-stone-200 last:border-0 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-8 text-left flex justify-between items-start gap-6 hover:bg-stone-50 transition-colors px-4 -mx-4 rounded-sm"
        >
          <div className="space-y-2 md:w-3/4">
            <h4 className={`text-xl font-serif font-medium transition-colors ${isOpen ? 'text-emerald-900' : 'text-stone-900 group-hover:text-emerald-800'}`}>
              {title}
            </h4>
            <p className="text-stone-500 font-sans font-light text-sm leading-relaxed">{summary}</p>
          </div>
          <div className={`shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-900' : 'text-stone-300 group-hover:text-emerald-800'}`}>
            {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
        </button>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 md:px-8 py-8 bg-stone-50 rounded-sm space-y-6 text-sm">
            {imageSrc && (
              <div className="mb-8">
                <div className="aspect-video w-full overflow-hidden rounded-sm bg-stone-200 mb-2">
                  <img
                    src={imageSrc}
                    alt={imageCaption || title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {imageCaption && <p className="text-xs text-stone-500 italic">{imageCaption}</p>}
              </div>
            )}

            <div className="grid md:grid-cols-12 gap-4">
              <span className="md:col-span-2 text-xs font-bold uppercase tracking-widest text-stone-400 mt-1">Challenge</span>
              <p className="md:col-span-10 text-stone-700 font-light leading-relaxed">{challenge}</p>
            </div>
            <div className="h-px bg-stone-200 w-full opacity-50"></div>
            <div className="grid md:grid-cols-12 gap-4">
              <span className="md:col-span-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mt-1">Intervention</span>
              <p className="md:col-span-10 text-stone-800 leading-relaxed">{intervention}</p>
            </div>
            <div className="h-px bg-stone-200 w-full opacity-50"></div>
            <div className="grid md:grid-cols-12 gap-4">
              <span className="md:col-span-2 text-xs font-bold uppercase tracking-widest text-stone-900 mt-1">Impact</span>
              <p className="md:col-span-10 text-stone-900 font-medium flex items-start gap-2">
                <ArrowUpRight className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                {impact}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProjectCategory = ({ category, description, children }: ProjectCategoryProps) => (
    <div className="mb-24">
      <div className="mb-8 border-l-4 border-emerald-900 pl-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-stone-400 mb-2">{category}</h3>
        <p className="text-lg font-serif italic text-stone-600">{description}</p>
      </div>
      <div className="space-y-0">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Manrope:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Manrope', sans-serif; }
      `}</style>
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-[#fdfcf8]/95 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'}`}>
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-serif font-bold tracking-tight text-stone-900">
            SAHANA<span className="text-emerald-800">.</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            <NavLink to="about" label="About Me" />
            <NavLink to="projects" label="Projects" />
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-xs font-bold uppercase tracking-widest px-5 py-2 bg-stone-900 text-white hover:bg-emerald-900 transition-colors duration-300 rounded-sm"
            >
              Contact
            </button>
          </div>

          <button onClick={() => setIsContactOpen(true)} className="md:hidden">
            <Mail className="w-5 h-5 text-stone-900" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 pt-20">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-7">
            <p className="text-emerald-800 font-bold tracking-widest uppercase text-xs mb-8 animate-fade-in-up">
              Strategic Initiatives Lead • APD
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1] text-stone-900 mb-8 tracking-tight">
              Inclusion <span className="italic text-stone-400">&</span> Impact<br/>
              <span className="italic text-stone-400">Architect</span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-12 max-w-lg">
               I architect ecosystems where inclusion is engineered by design, not retrofitted as an afterthought. I bridge the gap between boardroom vision and grassroots reality to ensure impact is structural, scalable, and sustainable.
            </p>
             
             <button onClick={() => scrollToSection('about')} className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-stone-900 hover:text-emerald-800 transition-colors">
               Explore My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </button>
          </div>

          <div className="md:col-span-5 relative">
            <div className="aspect-[3/4] relative rounded-sm shadow-xl overflow-hidden bg-stone-200">
              <img 
                src="/image-1.jpeg" 
                alt="Sahana L - Professional Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-900/5 -z-10 rounded-full blur-xl"></div>
          </div>

        </div>
      </section>

      {/* Section 1: About Me */}
      <section id="about" className="py-32 px-6 bg-white border-t border-stone-100">
        <div className="max-w-5xl mx-auto">
          
          {/* Intro Narrative */}
          <div className="grid md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-8 space-y-8">
              <Quote className="w-8 h-8 text-emerald-900 opacity-20" />
              <h2 className="text-3xl font-serif leading-tight text-stone-800">
                &ldquo;Strategy without execution is just theory. Execution without strategy is just noise.&rdquo;
              </h2>
              
              <div className="space-y-6 text-stone-600 font-light leading-relaxed text-lg">
                <p>
                  I have the unique privilege of waking up every day to connect dots that matter, and if I am lucky—create new ones. My career is built on a single, uncompromising premise: <strong>Inclusion is more than charity, it’s strategy.</strong>
                </p>
                <p>
                  Currently, I am living this truth as the <strong>Lead for Strategic Initiatives at APD</strong>. My role is to build the big picture—to turn ambitious ideas into sustainable ecosystems. I am architecting flagship initiatives like “The Disability NGO Excellence and Ecosystem Strengthening Initiative” and the “Centre of Excellence for Persons with Disabilities (Social Campus),” designed to anchor APD as a Thought Leader and an Ecosystem Enabler in the sector.
                </p>
                <div className="pl-6 border-l-2 border-emerald-900/30 italic text-stone-500 text-base">
                  &ldquo;I don’t just plan; I drive the strategy execution cycle. My focus is aligning internal capacities with external opportunities.&rdquo;
                </div>
              </div>
            </div>

            <div className="md:col-span-4 mt-8 md:mt-0">
               {/* Candid Photo */}
               <div className="aspect-square relative rounded-sm overflow-hidden bg-stone-200 shadow-lg">
                 <img 
                   src="/image-3.jpeg" 
                   alt="Winning TISS Awards - Grassroots & Academic Excellence" 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-stone-900/80 to-transparent p-4">
                    <p className="text-[10px] text-white/90 text-center uppercase tracking-widest">Bridging Boardroom & Grassroots</p>
                 </div>
               </div>
            </div>
          </div>

          {/* The Lenses Grid */}
          <div className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-8 text-center">My 360° Perspective is powered by</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <LensCard 
                title="The Funder’s Lens"
                icon={Briefcase}
                desc="Managed a portfolio of 15 projects worth over ₹35 Crore. I did more than allocate funds; I built a solid strategy that guided the investment of the Centre of Excellence for Persons with Disabilities, maximizing the Social Return on Investment (SROI)."
              />
              <LensCard 
                title="The Operator’s Grit"
                icon={Layout}
                desc="Managed 14 skilling projects across 5 states. I learned that for inclusion to work, it must be scalable and rooted in everyday execution."
              />
              <LensCard 
                title="The Field Immersion"
                icon={MapPin}
                desc="My strategic view is forged by execution. I have handled 25+ high-quality field projects. This diverse exposure ensures that my strategies are battle-tested against real-world complexities."
              />
              <LensCard 
                title="The Academic Rigor"
                icon={Award}
                desc="Masters in Disability Studies. Coupled with an Honours degree in Sociology, this education grounded my ability to design interventions rooted in both field realities and critical theory."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: My Projects */}
      <section id="projects" className="py-32 px-6 bg-[#f7f6f4]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-4">Strategic Initiatives</h2>
            <p className="text-stone-500 font-light max-w-xl mx-auto mb-12">A curated portfolio of ecosystem building, strategic capital engineering, and operational scaling.</p>
            
            {/* Featured Project Image */}
            <div className="aspect-[16/9] md:aspect-[21/9] w-full relative rounded-sm overflow-hidden bg-stone-200 shadow-sm border border-stone-200">
              <img 
                src="/image-2.jpeg" 
                alt="Strategic Initiatives Panel Discussion" 
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 w-full bg-stone-900/60 p-2 text-center">
                  <p className="text-[10px] text-white/90 uppercase tracking-widest">Driving Sector-Wide Dialogue</p>
              </div>
            </div>
          </div>

          {/* Category I */}
          <ProjectCategory 
            category="I. Strategy Design & System Architecture"
            description="Designing the structures and processes that sustain the sector."
          >
            <AccordionProject 
              title="Disability NGO Excellence Initiative"
              summary="Architecting a sector-wide infrastructure to dismantle silos and strengthen institutional capacity."
              challenge="The Sector is driven by compassion but constrained by capacity- weak compliance, inconsistent quality, limited expertise - resulting in low scalability and sustainability."
              intervention="Designing a strategic blueprint that aligns ecosystem partners and internal capacities to create a unified support network."
              impact="Positioning APD as a definitive 'Sector Enabler' and 'Thought Leader' by building a sustainable ecosystem for NGOs."
              imageSrc="/api/placeholder/800/400"
              imageCaption="Example: Strategic planning session with NGO partners"
            />
            <AccordionProject 
              title="The Social Campus"
              summary="Designing the architectural strategy for a 'Social Campus' to serve as the sector's centralized innovation lab."
              challenge="The sector lacks a dedicated physical and intellectual shared space for cross-pollinating and sharing inclusion models."
              intervention="Developing the architectural strategy for a 'Social Campus' that serves as an innovation lab and knowledge repository."
              impact="Establishing a future-ready ecosystem that centralizes R&D and sets new benchmarks for disability interventions globally."
            />
             <AccordionProject 
              title="Livelihood Unit 10X Strategy"
              summary="Engineered a 3-year roadmap to transition APD’s operations from incremental growth to exponential scale."
              challenge="Moving from incremental yearly growth to exponential scale without compromising service quality or retention."
              intervention="Developed a strategy with clear, engineered milestones for outreach, placement, and retention."
              impact="Set the organization on a trajectory to impact 10x more lives within three years."
            />
             <AccordionProject 
              title="Comprehensive Life Cycle Approach"
              summary="Implementing a full-spectrum intervention model covering Health, Education, and Livelihood for 6,000 PwDs."
              challenge="Disability interventions are often fragmented, treating medical issues in isolation from social or economic needs."
              intervention="Executing a holistic model across Health, Education, Livelihood, and Social domains, driven by local community ownership."
              impact="Delivered comprehensive care to 6,000 beneficiaries, ensuring sustainable outcomes through deep community alignment."
            />
          </ProjectCategory>

          {/* Category II */}
          <ProjectCategory 
            category="II. Strategic Capital Management"
            description="Investing funds with precision for optimized social return on investment."
          >
            <AccordionProject 
              title="Strategic Capital Management & Portfolio Oversight"
              summary="Managed the end-to-end lifecycle of a ₹35 Crore+ portfolio across 15 projects."
              challenge="Large-scale CSR funding risks inefficiency and 'leakage' without rigorous strategic oversight."
              intervention="Engineered rigorous 'Project Implementation Models' and M&E frameworks to bridge co-funders and implementing agencies."
              impact="Achieved 100% budget utilization and optimized objective achievement for partners like Dr. Reddy's and SCPwD."
            />
            <AccordionProject 
              title="The Strategic RFP Engine"
              summary="Designed and led a rigorous Request for Proposal (due-diligence process) to select high-impact partners."
              challenge="Identifying truly high-potential partners from a massive pool of applicants with varying capacities."
              intervention="Designed and led an end-to-end RFP process, including field visits and deep-dive scrutiny of 70+ proposals."
              impact="Secured sanctions for the high potential projects for the year and created a pipeline for next year."
            />
             <AccordionProject 
              title="Standardized Implementation Modeling"
              summary="Developed 15 distinct 'Project Implementation Models' using specialized tools to unify reporting."
              challenge="Diverse partners use different metrics, making it impossible to get a unified view of portfolio health."
              intervention="Created standardized models that unified financial and operational reporting."
              impact="Streamlined monitoring for 15 projects, enabling data-driven decision-making and seamless audit compliance."
            />
             <AccordionProject 
              title="Strategic Healthcare Interventions"
              summary="Monitored niche healthcare portfolios shifting care from clinical silos to community-driven models."
              challenge="Treating conditions like Clubfoot and Leprosy often fails when limited to hospitals, ignoring long-term community support."
              intervention="Managed the 'Clubfoot Elimination' (Anushkaa Foundation) and 'Comprehensive Ulcer Care' (Leprosy Mission Trust) projects."
              impact="Treated 1,800 children for clubfoot and 1,000 leprosy patients across UP, MP, and 16 pan-India hospitals."
            />
             <AccordionProject 
              title="Inclusive Education & Tech Strategy"
              summary="Guided strategic investments to bridge the access gap for 1,500+ beneficiaries in underserved regions."
              challenge="Students with visual impairment and those in remote geographies are systematically excluded from education and rehabilitation."
              intervention="Oversaw 'STEM for Visually Impaired' (Vision Empower) and 'Assistive Tech in Remote Geographies' (Mobility India)."
              impact="Delivered specialized pedagogy to 1,000 students and assistive devices to 560 beneficiaries in remote Assam."
            />
             <AccordionProject 
              title="Clinical Services Upgradation"
              summary="Managed infrastructure upgradation at Dr. S.R. Chandrasekhar Institute to scale screening capacity."
              challenge="Scaling healthcare often leads to a 'volume over quality' approach that treats patients as numbers."
              intervention="Upgraded clinical services to pair advanced diagnostic tools with deep empathy for individual needs."
              impact="Scaled screening capacity to 4,700 beneficiaries, ensuring precise and humane healthcare."
            />
          </ProjectCategory>

          {/* Category III */}
          <ProjectCategory 
            category="III. Operations & Scale"
            description="Turning ambitious strategies into on-ground reality."
          >
            <AccordionProject 
              title="Pan-India Skilling Operations"
              summary="Streamlined program operations for 14 skilling projects across 5 states, impacting 3,000+ lives annually."
              challenge="Managing operational consistency across diverse geographies and center types (Day Scholar vs. Residential)."
              intervention="Synchronized delivery standards and streamlined implementation workflows across all 14 projects."
              impact="Ensured consistent quality and outcomes for over 3,000 Persons with Disabilities annually."
            />
            <AccordionProject 
              title="Inclusive Policy Design"
              summary="Developed the Qualification Pack for the 'Loan Processing Officer' role to create a career pathway in banking."
              challenge="PwDs are often excluded from banking careers due to a lack of recognized, accessible job roles."
              intervention="Collaborated with the Skill Council for PwD (SCPwD) to design the curriculum and standards for this specific role."
              impact="Created a formal, certified entry point for PwDs into the financial services industry."
            />
             <AccordionProject 
              title="GROW PwD Program Oversight"
              summary="Oversaw a data-driven skilling program that achieved a 70% employment rate for 840 PwDs."
              challenge="Skilling programs often fail to bridge the 'last mile' gap to actual, sustainable employment."
              intervention="Monitored the project's advanced data management system for precise candidate tracking and enrollment."
              impact="Successfully trained 840 candidates with a market-leading 70% placement rate."
            />
             <AccordionProject 
              title="Field Diagnostics & Community Profiling"
              summary="Designed custom profiling tools to map 'invisible' disabilities in rural and slum belts."
              challenge="A lack of granular data on disability prevalence in rural belts prevents effective intervention."
              intervention="Utilized Participatory Rural Appraisal (PRA) tools to survey 70+ PwDs in Odisha and 50+ in Mumbai slums."
              impact="Created a data foundation for targeted support and established local community networks."
            />
          </ProjectCategory>

           {/* Category IV */}
           <ProjectCategory 
            category="IV. Research & Thought Leadership"
            description="Grounding strategy in rigorous evidence."
          >
            <AccordionProject 
              title="Study: Recruitment Processes of PwDs"
              summary="An award-winning analysis of corporate recruitment process maps to understand challenges."
              challenge="A significant gap exists between corporate intent to hire PwDs and the actual execution of inclusive recruitment practices."
              intervention="Analyzed successful execution models to map the specific process bottlenecks employers face."
              impact="Produced actionable strategies for mitigation, recognized as the 'Best Research Project' at TISS."
            />
            <AccordionProject 
              title="Study: Educator Perceptions of Inclusion"
              summary="An exploration of B.El.Ed graduates' awareness and readiness regarding inclusive education training."
              challenge="Mainstream educators are often unprepared to include Children with Disabilities (CWD) in their classrooms."
              intervention="Examined the perceptions of Bachelor of Elementary Education graduates towards inclusion."
              impact="Published in the TISS Journal of Disability Studies, highlighting critical gaps in teacher training curriculums."
            />
          </ProjectCategory>

        </div>
      </section>

      {/* Footer */}
      <section id="contact" className="py-24 px-6 bg-stone-900 text-stone-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">Let&apos;s connect dots.</h2>
          <p className="text-lg font-light mb-12 max-w-xl mx-auto opacity-80">
            Available for strategic consulting, ecosystem partnerships, and speaking engagements.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-20">
            <button
              onClick={() => setIsContactOpen(true)}
              className="text-sm font-bold tracking-widest uppercase px-8 py-3 bg-white text-stone-900 hover:bg-emerald-50 transition-colors duration-300 rounded-sm"
            >
              Send a Message
            </button>
            <a href="mailto:speaktosahana@gmail.com" className="text-sm font-bold tracking-widest uppercase hover:text-white transition-colors border-b border-stone-700 pb-1">
              Email Me
            </a>
            <a href="https://linkedin.com/in/sahanal" target="_blank" rel="noreferrer" className="text-sm font-bold tracking-widest uppercase hover:text-white transition-colors border-b border-stone-700 pb-1">
              LinkedIn
            </a>
          </div>

          <div className="text-xs uppercase tracking-widest opacity-40">
             <p>© 2025 Sahana L. • Bengaluru, India</p>
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default App;
