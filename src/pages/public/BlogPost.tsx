import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  BookOpen,
  Leaf,
  Recycle,
  Scissors,
  Home,
  Phone,
  Quote
} from "lucide-react";

// Import images
import heroImage from "../../assets/saree-upcycle-hero.jpg";
import sareeWaste from "../../assets/saree-waste.jpg";
import climateAction from "../../assets/climate-action.jpg";
import sareeSalwar from "../../assets/saree-salwar.jpg";
import sareeCroptop from "../../assets/saree-croptop.jpg";
import sareeHomedecor from "../../assets/saree-homedecor.jpg";
import authorImage from "../../assets/author-babita.jpg";
// Simple Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-serif text-2xl text-sage">
              SareeRevive
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm hover:text-sage transition-colors">Home</Link>
              <Link to="/blog" className="text-sm hover:text-sage transition-colors">Blog</Link>
              <Link to="/services" className="text-sm hover:text-sage transition-colors">Services</Link>
              <Link to="/contact" className="text-sm hover:text-sage transition-colors">Contact</Link>
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
      {/* Simple Footer */}
      <footer className="border-t border-border bg-secondary/30 mt-16">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2026 SareeRevive. All rights reserved. Sustainable fashion for a better tomorrow.
          </p>
        </div>
      </footer>
    </div>
  );
};

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "sage" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}: ButtonProps) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    sage: "bg-sage text-white hover:bg-sage/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-md px-8",
    icon: "h-10 w-10"
  };

  return (
    <button
      className={`
        inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors 
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
        disabled:pointer-events-none disabled:opacity-50
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Components
const Card = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`rounded-lg border border-border bg-card text-card-foreground shadow-sm ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

// Separator Component
const Separator = ({ 
  className = "",
  orientation = "horizontal" 
}: { 
  className?: string;
  orientation?: "horizontal" | "vertical";
}) => {
  return (
    <div
      className={`
        ${orientation === "horizontal" ? "h-px w-full" : "h-full w-px"}
        shrink-0 bg-border
        ${className}
      `}
    />
  );
};

const BlogPost = () => {
  const { id } = useParams();

  const keyTakeaways = [
    {
      icon: Leaf,
      title: "Massive Environmental Impact",
      description: "Each upcycled saree prevents 25kg of CO2 emissions and saves 2,700 liters of water compared to producing new garments."
    },
    {
      icon: Scissors,
      title: "Versatile Transformation",
      description: "Convert sarees into trendy crop tops, salwar suits, Indo-western fusion wear, home décor items, or practical lifestyle products."
    },
    {
      icon: Recycle,
      title: "Superior to Recycling",
      description: "Upcycling uses 88% less energy than recycling while preserving the original fabric's character and cultural storytelling value."
    },
    {
      icon: BookOpen,
      title: "Start Simple, Scale Up",
      description: "Begin with easy projects like cushion covers before attempting complex garments, or work with local artisans for professional results."
    }
  ];

  const environmentalStats = [
    { value: "7,793", label: "Kilotonnes textile waste annually in India" },
    { value: "70%", label: "Traditional clothing in textile waste" },
    { value: "200+", label: "Years for synthetic sarees to decompose" },
    { value: "2,700L", label: "Water to make one cotton saree" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Upcycling Sarees"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm tracking-wide">Back to Blog</span>
            </Link>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 bg-sage text-white text-xs font-sans tracking-wide uppercase rounded-full">
                Sustainability
              </span>
              <span className="px-4 py-1.5 bg-rose/80 text-white text-xs font-sans tracking-wide uppercase rounded-full">
                Fashion Tips
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight max-w-4xl mb-6">
              Why Upcycling Sarees is Your Smart Move Against{" "}
              <span className="text-accent italic">Climate Change</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" strokeWidth={1.5} />
                January 15, 2026
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 min read
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" strokeWidth={1.5} />
                Babita Dahal
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Author Card & Share */}
      <section className="bg-background border-b border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={authorImage}
                alt="Babita Dahal"
                className="w-14 h-14 rounded-full object-cover border-2 border-sage"
              />
              <div>
                <p className="font-serif text-lg text-foreground">Babita Dahal</p>
                <p className="text-sm text-muted-foreground">Fashion & Sustainability Expert</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground mr-2">Share:</span>
              <Button variant="ghost" size="icon" className="hover:bg-sage/10 hover:text-sage">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-sage/10 hover:text-sage">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-sage/10 hover:text-sage">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-sage/10 hover:text-sage">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                The world produces a staggering <strong className="text-foreground">100 million tons of textile waste</strong> every year. 
                Upcycling sarees presents a creative solution to this environmental crisis, especially when you consider that 
                approximately 100 billion clothing items are manufactured annually. With the Indian saree market reaching 
                USD 5.76 billion in 2024 and expected to grow to USD 10.33 billion by 2033, we have an opportunity to 
                transform this traditional garment's lifecycle.
              </p>
              
              <p className="text-foreground/80 leading-relaxed mb-12">
                When we look at sustainable fashion options, upcycling old sarees into dresses, home decor, and lifestyle 
                products stands out as particularly effective. The upcycled fashion segment is growing rapidly as more 
                consumers prioritize environmental responsibility alongside style. Furthermore, this practice helps preserve 
                the cultural heritage and traditions woven into these beautiful garments.
              </p>
            </motion.div>

            {/* Key Takeaways Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <Card className="bg-gradient-to-br from-sage/5 to-sage/10 border-sage/20 overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl text-foreground">Key Takeaways</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {keyTakeaways.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex gap-4"
                      >
                        <div className="w-8 h-8 bg-sage/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-sage" />
                        </div>
                        <div>
                          <h4 className="font-sans font-medium text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Section: Understanding the Impact */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Understanding the Impact of Saree Waste
              </h2>
              
              <div className="flex items-start gap-4 p-6 bg-sage/5 border-l-4 border-sage mb-8">
                <Quote className="w-6 h-6 text-sage flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg italic text-foreground/90 mb-2">
                    "Zero new fabric production = drastically reduced carbon footprint"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    — I Was a Sari, Sustainable Fashion Brand specializing in upcycled sari fashion
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <img
                    src={sareeWaste}
                    alt="Stack of vintage sarees"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    In India alone, a staggering <strong className="text-foreground">7,793 kilotonnes</strong> of textile 
                    waste accumulates annually, representing 8.5% of global textile waste. Traditional clothing like sarees 
                    account for <strong className="text-foreground">70% of all textile waste</strong> produced in the country.
                  </p>
                  <p className="text-foreground/80 leading-relaxed">
                    Nearly half of Indians express a desire to discard clothing they no longer use. Of the total textile 
                    waste generated in India, only 59% finds its way back into the textile industry through reuse and recycling, 
                    while the remaining 41% is either downcycled (19%), incinerated (5%), or ends up in landfills (17%).
                  </p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {environmentalStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 bg-rose/5 rounded-lg border border-rose/10"
                  >
                    <p className="font-serif text-3xl md:text-4xl text-rose mb-2">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="font-serif text-2xl text-foreground mb-4">
                Environmental Effects of Synthetic and Silk Sarees
              </h3>
              
              <p className="text-foreground/80 leading-relaxed mb-6">
                The environmental impact of discarded sarees varies dramatically based on their composition. 
                Synthetic sarees, often containing polyester, nylon, and acrylic, can take <strong className="text-foreground">over 200 years to decompose</strong>. 
                In fact, these plastic-based fibers release approximately 300 million microfibers per year into the 
                environment just through washing.
              </p>

              <div className="bg-charcoal text-white p-6 rounded-lg mb-8">
                <h4 className="font-sans font-medium text-lg mb-4">The Production Impact:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0" />
                    <span>Creating a new cotton saree consumes 2,700 liters of water</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0" />
                    <span>Textile dyeing ranks as the second-largest source of water pollution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0" />
                    <span>Dark-colored sarees require more dye powder, generating more toxic wastewater</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-sage rounded-full mt-2 flex-shrink-0" />
                    <span>The textile industry releases harmful chemicals like lead, chlorine, and formaldehyde into water bodies</span>
                  </li>
                </ul>
              </div>
            </motion.section>

            {/* Section: Climate Action */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Upcycling as a Smart Climate Action
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col justify-center">
                  <p className="text-foreground/80 leading-relaxed mb-6">
                    Transforming old sarees through upcycling offers more than just aesthetic appeal—it's a powerful 
                    climate action strategy that delivers measurable environmental benefits.
                  </p>
                  
                  <h3 className="font-serif text-xl text-foreground mb-4">
                    How Upcycling Supports Zero-Waste Living
                  </h3>
                  
                  <p className="text-foreground/80 leading-relaxed">
                    Upcycling sarees directly tackles the textile waste crisis by diverting materials from landfills. 
                    In 2023-24 alone, organizations like Goonj reutilized <strong className="text-foreground">3 million kilograms</strong> of 
                    underutilized textiles, significantly reducing environmental burden. Each upcycled saree prevents 
                    one garment from decomposing in landfills where it would release methane—a greenhouse gas 
                    25 times more potent than CO2.
                  </p>
                </div>
                <div>
                  <img
                    src={climateAction}
                    alt="Sustainable fashion"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
              </div>

              {/* Carbon Impact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-sage/20 hover:shadow-sage transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Recycle className="w-6 h-6 text-sage" />
                    </div>
                    <p className="font-serif text-3xl text-sage mb-2">20 tons</p>
                    <p className="text-sm text-muted-foreground">CO2 saved per ton of textiles upcycled</p>
                  </CardContent>
                </Card>
                
                <Card className="border-rose/20 hover:shadow-rose transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Leaf className="w-6 h-6 text-rose" />
                    </div>
                    <p className="font-serif text-3xl text-rose mb-2">85%</p>
                    <p className="text-sm text-muted-foreground">Water consumption reduced vs new production</p>
                  </CardContent>
                </Card>
                
                <Card className="border-sage/20 hover:shadow-sage transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-6 h-6 text-sage" />
                    </div>
                    <p className="font-serif text-3xl text-sage mb-2">88%</p>
                    <p className="text-sm text-muted-foreground">Less energy used compared to recycling</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 bg-sage/5 rounded-lg border border-sage/10">
                <h4 className="font-serif text-xl text-foreground mb-4">Why Upcycling is Better Than Recycling</h4>
                <p className="text-foreground/80 leading-relaxed">
                  Unlike recycling, which breaks down materials requiring significant energy, upcycling preserves the 
                  original form and embodied energy. Recycling plastic requires up to 7,000 kilowatt hours of energy 
                  per ton, whereas upcycling uses up to 88% less energy. Beyond environmental benefits, upcycled 
                  sarees create unique, one-of-a-kind pieces with inherent storytelling value—appealing to the 
                  <strong className="text-foreground"> 62% of Gen Z shoppers</strong> who prefer sustainable brands.
                </p>
              </div>
            </motion.section>

            {/* Section: Upcycling Ideas */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Upcycling Ideas That Blend Style and Sustainability
              </h2>

              <div className="flex items-start gap-4 p-6 bg-rose/5 border-l-4 border-rose mb-8">
                <Quote className="w-6 h-6 text-rose flex-shrink-0 mt-1" />
                <div>
                  <p className="text-lg italic text-foreground/90 mb-2">
                    "I believe it is important to do things that are relevant to the times we are living in. 
                    You are giving a new purpose to the fabrics."
                  </p>
                  <p className="text-sm text-muted-foreground">
                    — Asmitha Ashok, Chennai-based Fashion Designer specializing in upcycling
                  </p>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-8">
                Your old sarees hold untapped potential for stunning transformations that combine traditional 
                elegance with contemporary designs. These beautiful six-yard wonders can be reimagined into 
                various stylish creations that extend their lifecycle while showcasing your creativity.
              </p>

              {/* Upcycling Idea Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group overflow-hidden rounded-lg border border-border hover:border-sage/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={sareeSalwar}
                      alt="Saree to Salwar Suit"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-foreground mb-3">
                      From Saree to Salwar Suit
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Transforming an old saree into a salwar suit stands as one of the most practical upcycling 
                      approaches. Vintage Banarasi or pattu sarees make exceptional salwar suits when the saree 
                      body becomes the top and the border adds distinctive flair to sleeves, necklines, or hemlines.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group overflow-hidden rounded-lg border border-border hover:border-rose/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={sareeCroptop}
                      alt="Saree to Crop Top"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-foreground mb-3">
                      Saree to Crop Top and Trousers
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Breathe new life into your sarees by converting them into trendy crop tops paired with trousers. 
                      The saree's pallu often works wonderfully for creating statement sleeves or unique design elements. 
                      This combination particularly shines with blend silk fabrics.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group overflow-hidden rounded-lg border border-border hover:border-sage/50 transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={sareeHomedecor}
                      alt="Saree Home Decor"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Home className="w-5 h-5 text-sage" />
                      <h3 className="font-serif text-xl text-foreground">
                        Home Products: Lamps, Coasters & More
                      </h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Beyond clothing, sarees offer abundant possibilities for home décor. Turn silk sarees into 
                      elegant table runners, cushion covers, or wall hangings that showcase their intricate patterns. 
                      Six meters of fabric provides ample material for stunning window treatments.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="group overflow-hidden rounded-lg bg-gradient-to-br from-sage to-sage-dark text-white"
                >
                  <div className="p-8 flex flex-col justify-center h-full min-h-[300px]">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                      <Scissors className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl mb-4">
                      Indo-Western Fusion Wear
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed mb-6">
                      Create eye-catching Indo-western ensembles: stylish capes, elegant floor-length gowns 
                      utilizing gradient patterns, or sophisticated lehengas showcasing original border details.
                    </p>
                    <ul className="space-y-2 text-sm text-white/70">
                      <li>• Stylish capes & half jackets</li>
                      <li>• Floor-length gowns</li>
                      <li>• Sophisticated lehengas</li>
                    </ul>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* Section: How to Start */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                How to Start Your Upcycling Journey
              </h2>

              <p className="text-foreground/80 leading-relaxed mb-8">
                Ready to breathe new life into those treasured but unworn sarees? Beginning your upcycling 
                adventure requires thoughtful planning and creativity.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center flex-shrink-0 text-white font-serif text-xl">
                    1
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-foreground mb-2">Choose the Right Sarees</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Before cutting into your grandmother's vintage silk, assess the fabric's condition. Hold the 
                      saree against light to check for thinning areas and examine fold lines where silk often tears 
                      over time. The most suitable candidates have beautiful patterns but might be slightly damaged, 
                      out of fashion, or too heavy for regular wear.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-rose rounded-full flex items-center justify-center flex-shrink-0 text-white font-serif text-xl">
                    2
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-foreground mb-2">Find Inspiration</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Explore platforms showcasing upcycled creations from brands like I Was A Sari or Mishcat Co. 
                      Browse social media for trending designs—floor-length Anarkalis, fusion gowns, and everyday 
                      kurtis rank among popular transformations. Visualization is crucial since you're working with 
                      existing patterns rather than blank fabric.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center flex-shrink-0 text-white font-serif text-xl">
                    3
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-foreground mb-2">Work with Artisans or DIY</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      For professional results, consult with skilled tailors who understand saree fabric properties. 
                      Many designers offer video consultations to assess your saree and recommend suitable silhouettes. 
                      For DIY enthusiasts, start with simpler projects like cushion covers or table runners before 
                      attempting complex garments.
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-rose rounded-full flex items-center justify-center flex-shrink-0 text-white font-serif text-xl">
                    4
                  </div>
                  <div>
                    <h4 className="font-serif text-xl text-foreground mb-2">Share Your Creations</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Showcase your upcycled treasures through social media, community events, or local markets. 
                      Sharing transformation stories helps spread the sustainable fashion movement while potentially 
                      inspiring others to start their own upcycling projects.
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Conclusion */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Conclusion
              </h2>

              <p className="text-foreground/80 leading-relaxed mb-6">
                Upcycling sarees represents a powerful personal action against climate change with far-reaching 
                benefits. Each transformed saree prevents methane emissions, saves thousands of liters of water, 
                and reduces carbon output significantly. Rather than letting these beautiful fabrics languish in 
                closets or contribute to landfills, we can breathe new life into them through creative repurposing.
              </p>

              <p className="text-foreground/80 leading-relaxed mb-6">
                The versatility of sarees truly shines when reimagined as stylish salwar suits, trendy crop tops, 
                elegant home décor, or practical lifestyle products. This approach not only honors the cultural 
                heritage embedded in these textiles but also aligns with growing consumer preference for sustainable 
                fashion choices.
              </p>

              <p className="text-foreground/80 leading-relaxed">
                Ultimately, upcycling represents more than just fashion transformation; it embodies a mindset shift 
                toward conscious consumption. Through these creative endeavors, we reduce waste, preserve resources, 
                and create unique pieces with stories to tell. Therefore, next time you rediscover an old saree 
                tucked away, consider its potential for a beautiful second life—your closet holds both memories 
                and opportunities for meaningful climate action.
              </p>
            </motion.section>

            <Separator className="my-12" />

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-br from-sage/10 to-rose/10 p-10 rounded-2xl"
            >
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                Ready to Transform Your Old Sarees?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                If you would like to upscale your old sarees into stunning new creations, 
                our expert designers are here to help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="sage" size="lg" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Us: +91 7020601937
                </Button>
                <Link to="/appointment">
                  <Button variant="outline" size="lg">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </motion.div>

            <Separator className="my-12" />

            {/* References */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-xl text-foreground mb-4">References</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>
                  <a href="https://iwasasari.com/blogs/planet/demystifying-upcycling-and-recycling" className="hover:text-sage transition-colors" target="_blank" rel="noopener noreferrer">
                    I Was a Sari - Demystifying Upcycling and Recycling
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/DollyJainStylist/videos/" className="hover:text-sage transition-colors" target="_blank" rel="noopener noreferrer">
                    Dolly Jain Stylist - Rural Indian Entrepreneurship
                  </a>
                </li>
                <li>
                  <a href="https://www.unnatisilks.com/blogs/fiber-talk/" className="hover:text-sage transition-colors" target="_blank" rel="noopener noreferrer">
                    Unnati Silks - Fiber Talk
                  </a>
                </li>
                <li>
                  <a href="https://myfabpoint.com/environmental-impact-of-upcycled-bags/" className="hover:text-sage transition-colors" target="_blank" rel="noopener noreferrer">
                    MyFabPoint - Environmental Impact of Upcycled Bags
                  </a>
                </li>
                <li>
                  <a href="https://goonj.org/" className="hover:text-sage transition-colors" target="_blank" rel="noopener noreferrer">
                    Goonj - Transform Sarees into Dignified Development
                  </a>
                </li>
              </ol>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl text-foreground text-center mb-12">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "10 Ways to Transform Your Old Sarees",
                image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80",
                date: "December 28, 2025"
              },
              {
                title: "Hand Embroidery vs Machine Embroidery",
                image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=400&q=80",
                date: "November 28, 2025"
              },
              {
                title: "Sustainable Fashion Trends for 2026",
                image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=400&q=80",
                date: "December 10, 2025"
              }
            ].map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="font-serif text-lg text-foreground group-hover:text-sage transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPost;