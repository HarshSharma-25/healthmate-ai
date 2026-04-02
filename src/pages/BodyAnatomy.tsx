import { useState } from "react";
import { ArrowLeft, Search, ZoomIn, ZoomOut, RotateCcw, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface BodyPart {
  id: string;
  name: string;
  category: "major" | "minor";
  system: string;
  position: { top: string; left: string };
  description: string;
  functions: string[];
  conditions: string[];
}

const bodyParts: BodyPart[] = [
  // Head & Brain
  { id: "brain", name: "Brain", category: "major", system: "Nervous", position: { top: "5%", left: "50%" }, description: "The central organ of the nervous system, controlling thought, memory, emotion, motor skills, vision, breathing, and every process that regulates the body.", functions: ["Cognitive processing", "Motor control", "Sensory interpretation", "Hormone regulation"], conditions: ["Stroke", "Alzheimer's", "Epilepsy", "Concussion"] },
  { id: "skull", name: "Skull", category: "minor", system: "Skeletal", position: { top: "3%", left: "43%" }, description: "A bony structure forming the head, protecting the brain and supporting facial structures.", functions: ["Brain protection", "Facial structure support", "Sensory organ housing"], conditions: ["Fractures", "Craniosynostosis"] },
  { id: "pituitary", name: "Pituitary Gland", category: "minor", system: "Endocrine", position: { top: "8%", left: "57%" }, description: "A pea-sized gland at the base of the brain that produces hormones governing growth, metabolism, and reproduction.", functions: ["Growth hormone secretion", "TSH production", "ACTH release"], conditions: ["Pituitary adenoma", "Hypopituitarism"] },
  
  // Eyes, Ears, Nose
  { id: "eyes", name: "Eyes", category: "minor", system: "Sensory", position: { top: "9%", left: "46%" }, description: "Organs of vision that detect light and convert it to electrochemical impulses in neurons.", functions: ["Light detection", "Color perception", "Depth perception", "Peripheral vision"], conditions: ["Cataracts", "Glaucoma", "Macular degeneration"] },
  { id: "ears", name: "Ears", category: "minor", system: "Sensory", position: { top: "10%", left: "40%" }, description: "Organs of hearing and balance, converting sound waves into nerve signals.", functions: ["Sound detection", "Balance maintenance", "Spatial orientation"], conditions: ["Otitis media", "Tinnitus", "Hearing loss"] },
  
  // Neck & Throat
  { id: "thyroid", name: "Thyroid Gland", category: "minor", system: "Endocrine", position: { top: "16%", left: "50%" }, description: "A butterfly-shaped gland in the neck that produces hormones regulating metabolism, energy, and growth.", functions: ["Metabolism regulation", "T3/T4 production", "Calcium regulation"], conditions: ["Hypothyroidism", "Hyperthyroidism", "Goiter", "Thyroid cancer"] },
  { id: "larynx", name: "Larynx (Voice Box)", category: "minor", system: "Respiratory", position: { top: "15%", left: "44%" }, description: "Houses the vocal cords and acts as a switching mechanism between breathing and swallowing.", functions: ["Sound production", "Airway protection", "Air passage"], conditions: ["Laryngitis", "Vocal cord nodules"] },
  
  // Chest & Torso
  { id: "heart", name: "Heart", category: "major", system: "Cardiovascular", position: { top: "28%", left: "53%" }, description: "A muscular organ that pumps blood through the circulatory system, supplying oxygen and nutrients to tissues and removing carbon dioxide and waste.", functions: ["Blood pumping", "Oxygen distribution", "Nutrient transport", "Waste removal"], conditions: ["Heart attack", "Heart failure", "Arrhythmia", "Coronary artery disease"] },
  { id: "lungs", name: "Lungs", category: "major", system: "Respiratory", position: { top: "26%", left: "44%" }, description: "The primary organs of respiration, facilitating gas exchange between air and blood.", functions: ["Oxygen intake", "CO2 expulsion", "Blood pH regulation", "Air filtration"], conditions: ["Pneumonia", "Asthma", "COPD", "Lung cancer", "Pulmonary embolism"] },
  { id: "ribcage", name: "Rib Cage", category: "minor", system: "Skeletal", position: { top: "25%", left: "57%" }, description: "A bony and cartilaginous structure surrounding the thoracic cavity, protecting the heart, lungs, and major blood vessels.", functions: ["Organ protection", "Breathing support", "Structural support"], conditions: ["Rib fractures", "Costochondritis"] },
  { id: "esophagus", name: "Esophagus", category: "minor", system: "Digestive", position: { top: "22%", left: "48%" }, description: "A muscular tube connecting the throat to the stomach, transporting food via peristalsis.", functions: ["Food transport", "Peristaltic movement"], conditions: ["GERD", "Esophagitis", "Barrett's esophagus"] },
  { id: "diaphragm", name: "Diaphragm", category: "minor", system: "Muscular", position: { top: "35%", left: "44%" }, description: "A dome-shaped muscle at the base of the chest, essential for breathing.", functions: ["Breathing mechanics", "Pressure regulation", "Separating chest/abdomen"], conditions: ["Hiatal hernia", "Diaphragmatic paralysis"] },
  
  // Abdomen
  { id: "stomach", name: "Stomach", category: "major", system: "Digestive", position: { top: "38%", left: "53%" }, description: "A muscular, hollow organ that holds food while it is being mixed with stomach enzymes for digestion.", functions: ["Food storage", "Acid production", "Protein digestion", "Nutrient absorption"], conditions: ["Gastritis", "Ulcers", "Stomach cancer", "GERD"] },
  { id: "liver", name: "Liver", category: "major", system: "Digestive", position: { top: "36%", left: "57%" }, description: "The largest internal organ, performing over 500 functions including detoxification, protein synthesis, and bile production.", functions: ["Detoxification", "Bile production", "Protein synthesis", "Glucose storage", "Vitamin storage"], conditions: ["Hepatitis", "Cirrhosis", "Fatty liver disease", "Liver cancer"] },
  { id: "gallbladder", name: "Gallbladder", category: "minor", system: "Digestive", position: { top: "37%", left: "60%" }, description: "A small organ beneath the liver that stores and concentrates bile produced by the liver.", functions: ["Bile storage", "Bile concentration", "Fat digestion aid"], conditions: ["Gallstones", "Cholecystitis"] },
  { id: "pancreas", name: "Pancreas", category: "minor", system: "Digestive/Endocrine", position: { top: "40%", left: "47%" }, description: "A gland organ producing enzymes for digestion and hormones (insulin, glucagon) for blood sugar regulation.", functions: ["Insulin production", "Digestive enzyme secretion", "Blood sugar regulation"], conditions: ["Diabetes", "Pancreatitis", "Pancreatic cancer"] },
  { id: "spleen", name: "Spleen", category: "minor", system: "Lymphatic", position: { top: "38%", left: "42%" }, description: "An organ that filters blood, recycles old red blood cells, and stores white blood cells and platelets.", functions: ["Blood filtration", "Immune response", "RBC recycling", "Platelet storage"], conditions: ["Splenomegaly", "Ruptured spleen"] },
  { id: "kidneys", name: "Kidneys", category: "major", system: "Urinary", position: { top: "42%", left: "43%" }, description: "Bean-shaped organs that filter blood, remove waste, regulate fluid balance, and produce urine.", functions: ["Blood filtration", "Urine production", "Electrolyte balance", "Blood pressure regulation", "Red blood cell production"], conditions: ["Kidney stones", "Chronic kidney disease", "Kidney infection", "Renal failure"] },
  { id: "adrenal", name: "Adrenal Glands", category: "minor", system: "Endocrine", position: { top: "40%", left: "40%" }, description: "Small glands atop each kidney producing hormones like cortisol, adrenaline, and aldosterone.", functions: ["Cortisol production", "Adrenaline release", "Stress response", "Metabolism regulation"], conditions: ["Addison's disease", "Cushing's syndrome", "Adrenal insufficiency"] },
  
  // Intestines
  { id: "small-intestine", name: "Small Intestine", category: "major", system: "Digestive", position: { top: "48%", left: "50%" }, description: "A 20-foot long tube where most nutrient absorption occurs, consisting of the duodenum, jejunum, and ileum.", functions: ["Nutrient absorption", "Enzymatic digestion", "Bile mixing", "Immune function"], conditions: ["Celiac disease", "Crohn's disease", "Small bowel obstruction"] },
  { id: "large-intestine", name: "Large Intestine (Colon)", category: "major", system: "Digestive", position: { top: "52%", left: "46%" }, description: "Absorbs water and electrolytes from remaining food matter and compacts waste into stool.", functions: ["Water absorption", "Electrolyte absorption", "Stool formation", "Gut microbiome hosting"], conditions: ["Colitis", "Colon cancer", "IBS", "Diverticulitis"] },
  { id: "appendix", name: "Appendix", category: "minor", system: "Digestive/Immune", position: { top: "54%", left: "43%" }, description: "A small, finger-shaped pouch at the junction of the small and large intestine, playing a role in gut immunity.", functions: ["Gut bacteria reservoir", "Immune function support"], conditions: ["Appendicitis"] },
  
  // Reproductive & Urinary
  { id: "bladder", name: "Bladder", category: "minor", system: "Urinary", position: { top: "58%", left: "50%" }, description: "A hollow muscular organ that stores urine before excretion.", functions: ["Urine storage", "Urination control"], conditions: ["UTI", "Bladder cancer", "Incontinence", "Overactive bladder"] },
  
  // Arms & Shoulders
  { id: "shoulder", name: "Shoulder Joint", category: "minor", system: "Musculoskeletal", position: { top: "22%", left: "35%" }, description: "The most mobile joint in the body, connecting the arm to the torso.", functions: ["Arm movement", "Lifting", "Rotation", "Throwing"], conditions: ["Rotator cuff tear", "Frozen shoulder", "Dislocation", "Bursitis"] },
  { id: "biceps", name: "Biceps", category: "minor", system: "Muscular", position: { top: "30%", left: "33%" }, description: "A large muscle on the front of the upper arm, responsible for flexion at the elbow.", functions: ["Elbow flexion", "Forearm supination", "Lifting"], conditions: ["Bicep tendinitis", "Muscle tear"] },
  { id: "elbow", name: "Elbow Joint", category: "minor", system: "Musculoskeletal", position: { top: "36%", left: "31%" }, description: "A hinge joint connecting the upper arm to the forearm.", functions: ["Arm bending", "Forearm rotation"], conditions: ["Tennis elbow", "Golfer's elbow", "Bursitis"] },
  { id: "forearm", name: "Forearm", category: "minor", system: "Musculoskeletal", position: { top: "42%", left: "32%" }, description: "The part of the arm between the elbow and wrist, containing two major bones (radius and ulna) and many muscles.", functions: ["Wrist movement", "Grip strength", "Pronation/supination"], conditions: ["Fractures", "Carpal tunnel syndrome"] },
  { id: "hand", name: "Hand", category: "minor", system: "Musculoskeletal", position: { top: "52%", left: "30%" }, description: "A complex structure of 27 bones, muscles, and tendons enabling fine motor skills.", functions: ["Grasping", "Fine motor skills", "Touch sensation", "Communication"], conditions: ["Arthritis", "Carpal tunnel", "Trigger finger", "Fractures"] },
  
  // Right arm
  { id: "r-shoulder", name: "Right Shoulder", category: "minor", system: "Musculoskeletal", position: { top: "22%", left: "65%" }, description: "The right shoulder joint, mirroring the left shoulder's structure and function.", functions: ["Arm movement", "Lifting", "Rotation"], conditions: ["Rotator cuff tear", "Impingement"] },
  
  // Spine
  { id: "spine", name: "Spine (Vertebral Column)", category: "major", system: "Skeletal", position: { top: "35%", left: "50%" }, description: "A column of 33 vertebrae protecting the spinal cord and providing structural support for the body.", functions: ["Spinal cord protection", "Structural support", "Flexibility", "Weight bearing"], conditions: ["Herniated disc", "Scoliosis", "Spinal stenosis", "Osteoporosis"] },
  
  // Hips & Pelvis
  { id: "pelvis", name: "Pelvis", category: "minor", system: "Skeletal", position: { top: "55%", left: "50%" }, description: "A basin-shaped structure supporting the spine and protecting abdominal organs.", functions: ["Weight transfer", "Organ protection", "Muscle attachment", "Childbirth support"], conditions: ["Pelvic fracture", "Pelvic inflammatory disease"] },
  { id: "hip", name: "Hip Joint", category: "minor", system: "Musculoskeletal", position: { top: "56%", left: "43%" }, description: "A ball-and-socket joint connecting the leg to the pelvis, bearing the body's weight.", functions: ["Walking", "Standing", "Weight bearing", "Leg rotation"], conditions: ["Hip fracture", "Osteoarthritis", "Bursitis", "Hip dysplasia"] },
  
  // Legs
  { id: "femur", name: "Femur (Thigh Bone)", category: "minor", system: "Skeletal", position: { top: "63%", left: "46%" }, description: "The longest and strongest bone in the body, located in the thigh.", functions: ["Weight bearing", "Walking support", "Muscle attachment"], conditions: ["Femoral fracture", "Osteoporosis"] },
  { id: "quadriceps", name: "Quadriceps", category: "minor", system: "Muscular", position: { top: "65%", left: "54%" }, description: "A group of four muscles on the front of the thigh, essential for walking, running, and jumping.", functions: ["Knee extension", "Walking", "Running", "Jumping", "Standing"], conditions: ["Muscle strain", "Tendinitis", "Quad tear"] },
  { id: "knee", name: "Knee Joint", category: "minor", system: "Musculoskeletal", position: { top: "72%", left: "46%" }, description: "The largest joint in the body, a hinge joint connecting the thigh to the lower leg.", functions: ["Leg bending", "Weight bearing", "Walking", "Stability"], conditions: ["ACL tear", "Meniscus tear", "Osteoarthritis", "Patella dislocation"] },
  { id: "tibia", name: "Tibia (Shin Bone)", category: "minor", system: "Skeletal", position: { top: "78%", left: "47%" }, description: "The larger of the two bones in the lower leg, bearing most of the body's weight.", functions: ["Weight bearing", "Walking support", "Ankle movement"], conditions: ["Shin splints", "Stress fracture", "Tibial fracture"] },
  { id: "calf", name: "Calf Muscles", category: "minor", system: "Muscular", position: { top: "79%", left: "54%" }, description: "Muscles at the back of the lower leg (gastrocnemius and soleus), essential for walking and standing.", functions: ["Ankle flexion", "Walking propulsion", "Standing balance", "Blood circulation"], conditions: ["Calf strain", "DVT", "Achilles tendinitis"] },
  { id: "ankle", name: "Ankle Joint", category: "minor", system: "Musculoskeletal", position: { top: "88%", left: "46%" }, description: "A hinge joint connecting the foot to the leg, allowing up and down movement.", functions: ["Foot movement", "Balance", "Walking", "Weight bearing"], conditions: ["Sprain", "Fracture", "Achilles tendon rupture"] },
  { id: "foot", name: "Foot", category: "minor", system: "Musculoskeletal", position: { top: "93%", left: "47%" }, description: "A complex structure of 26 bones, 33 joints, and over 100 muscles, tendons, and ligaments.", functions: ["Walking", "Balance", "Weight support", "Shock absorption"], conditions: ["Plantar fasciitis", "Bunions", "Flat feet", "Fractures"] },
];

const systemColors: Record<string, string> = {
  "Nervous": "hsl(270, 80%, 60%)",
  "Skeletal": "hsl(40, 80%, 55%)",
  "Cardiovascular": "hsl(0, 80%, 55%)",
  "Respiratory": "hsl(200, 80%, 55%)",
  "Digestive": "hsl(30, 80%, 50%)",
  "Endocrine": "hsl(320, 70%, 55%)",
  "Urinary": "hsl(50, 70%, 50%)",
  "Lymphatic": "hsl(150, 60%, 45%)",
  "Muscular": "hsl(10, 70%, 55%)",
  "Musculoskeletal": "hsl(180, 60%, 45%)",
  "Sensory": "hsl(260, 60%, 55%)",
  "Digestive/Endocrine": "hsl(30, 70%, 55%)",
  "Digestive/Immune": "hsl(30, 60%, 50%)",
};

const BodyAnatomy = () => {
  const navigate = useNavigate();
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoom, setZoom] = useState(1);
  const [filterSystem, setFilterSystem] = useState<string | null>(null);
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  const systems = [...new Set(bodyParts.map(p => p.system))];

  const filteredParts = bodyParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.system.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterSystem || part.system === filterSystem;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[hsl(220,25%,8%)] text-[hsl(200,100%,90%)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[hsl(220,25%,12%)] border-b border-[hsl(200,80%,30%)]/30">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-[hsl(200,100%,70%)] hover:bg-[hsl(200,80%,20%)]/30">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-[hsl(200,100%,70%)] to-[hsl(280,100%,70%)] bg-clip-text text-transparent">
              Human Body Anatomy Scanner
            </h1>
            <p className="text-xs text-[hsl(200,60%,50%)]">Interactive 3D Body Structure Explorer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="text-[hsl(200,100%,70%)] hover:bg-[hsl(200,80%,20%)]/30">
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-xs text-[hsl(200,60%,50%)] w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button variant="ghost" size="icon" onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="text-[hsl(200,100%,70%)] hover:bg-[hsl(200,80%,20%)]/30">
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => { setZoom(1); setSelectedPart(null); setFilterSystem(null); }} className="text-[hsl(200,100%,70%)] hover:bg-[hsl(200,80%,20%)]/30">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-60px)]">
        {/* Left Panel - Systems & Search */}
        <div className="w-64 bg-[hsl(220,25%,10%)] border-r border-[hsl(200,80%,30%)]/20 flex flex-col">
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-[hsl(200,60%,40%)]" />
              <Input
                placeholder="Search body parts..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 bg-[hsl(220,25%,15%)] border-[hsl(200,80%,30%)]/30 text-[hsl(200,100%,90%)] placeholder:text-[hsl(200,40%,40%)] text-sm h-9"
              />
            </div>
          </div>
          
          {/* System filters */}
          <div className="px-3 pb-2 flex flex-wrap gap-1">
            <Badge
              variant={!filterSystem ? "default" : "outline"}
              className={`cursor-pointer text-[10px] ${!filterSystem ? 'bg-[hsl(200,80%,40%)] text-white' : 'border-[hsl(200,80%,30%)]/40 text-[hsl(200,60%,50%)]'}`}
              onClick={() => setFilterSystem(null)}
            >All</Badge>
            {systems.map(s => (
              <Badge
                key={s}
                variant={filterSystem === s ? "default" : "outline"}
                className="cursor-pointer text-[10px]"
                style={{
                  backgroundColor: filterSystem === s ? systemColors[s] : 'transparent',
                  borderColor: systemColors[s],
                  color: filterSystem === s ? 'white' : systemColors[s],
                }}
                onClick={() => setFilterSystem(filterSystem === s ? null : s)}
              >{s}</Badge>
            ))}
          </div>

          {/* Parts list */}
          <ScrollArea className="flex-1 px-3">
            <div className="space-y-1 pb-4">
              {filteredParts.map(part => (
                <button
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  onMouseEnter={() => setHoveredPart(part.id)}
                  onMouseLeave={() => setHoveredPart(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedPart?.id === part.id
                      ? 'bg-[hsl(200,80%,25%)] text-white'
                      : 'hover:bg-[hsl(220,25%,15%)] text-[hsl(200,60%,60%)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{part.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: systemColors[part.system] + '22', color: systemColors[part.system] }}>
                      {part.category === "major" ? "★" : "○"}
                    </span>
                  </div>
                  <span className="text-[10px]" style={{ color: systemColors[part.system] }}>{part.system}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center - Body Viewer */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center">
          {/* Grid background */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(hsl(200,80%,30%,0.05) 1px, transparent 1px),
              linear-gradient(90deg, hsl(200,80%,30%,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
          
          {/* Scan lines animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[hsl(200,100%,50%,0.3)] to-transparent animate-scan" />
          </div>

          {/* Body container */}
          <div className="relative" style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}>
            {/* SVG Human Body */}
            <svg viewBox="0 0 200 500" className="w-[280px] h-[700px]" style={{ filter: 'drop-shadow(0 0 20px hsl(200,100%,50%,0.2))' }}>
              {/* Head */}
              <ellipse cx="100" cy="35" rx="22" ry="28" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1" opacity="0.7" />
              <ellipse cx="100" cy="35" rx="22" ry="28" fill="hsl(200,100%,50%)" opacity="0.05" />
              
              {/* Neck */}
              <rect x="92" y="62" width="16" height="15" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="0.8" opacity="0.5" rx="3" />
              
              {/* Torso */}
              <path d="M 70 77 Q 60 85 58 100 L 55 160 Q 55 180 65 200 L 75 210 Q 85 215 100 215 Q 115 215 125 210 L 135 200 Q 145 180 145 160 L 142 100 Q 140 85 130 77 Z"
                fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1" opacity="0.7" />
              <path d="M 70 77 Q 60 85 58 100 L 55 160 Q 55 180 65 200 L 75 210 Q 85 215 100 215 Q 115 215 125 210 L 135 200 Q 145 180 145 160 L 142 100 Q 140 85 130 77 Z"
                fill="hsl(200,100%,50%)" opacity="0.03" />
              
              {/* Spine line */}
              <line x1="100" y1="77" x2="100" y2="215" stroke="hsl(200,100%,60%)" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3" />
              
              {/* Rib cage lines */}
              {[90, 100, 110, 120, 130].map((y, i) => (
                <ellipse key={i} cx="100" cy={y} rx={30 - i * 2} ry="4" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="0.4" opacity="0.25" />
              ))}

              {/* Heart indicator */}
              <circle cx="108" cy="115" r="8" fill="hsl(0,80%,50%)" opacity="0.15" stroke="hsl(0,80%,50%)" strokeWidth="0.5">
                <animate attributeName="r" values="7;9;7" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0.25;0.15" dur="1.2s" repeatCount="indefinite" />
              </circle>
              
              {/* Lungs */}
              <ellipse cx="82" cy="110" rx="15" ry="22" fill="hsl(200,80%,50%)" opacity="0.08" stroke="hsl(200,80%,50%)" strokeWidth="0.5">
                <animate attributeName="ry" values="22;24;22" dur="3s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="118" cy="110" rx="15" ry="22" fill="hsl(200,80%,50%)" opacity="0.08" stroke="hsl(200,80%,50%)" strokeWidth="0.5">
                <animate attributeName="ry" values="22;24;22" dur="3s" repeatCount="indefinite" />
              </ellipse>

              {/* Organs outline */}
              <ellipse cx="110" cy="150" rx="12" ry="8" fill="hsl(30,80%,50%)" opacity="0.08" stroke="hsl(30,80%,50%)" strokeWidth="0.4" /> {/* Liver */}
              <ellipse cx="90" cy="155" rx="10" ry="7" fill="hsl(30,70%,45%)" opacity="0.08" stroke="hsl(30,70%,45%)" strokeWidth="0.4" /> {/* Stomach */}
              <ellipse cx="85" cy="175" rx="6" ry="6" fill="hsl(50,70%,50%)" opacity="0.08" stroke="hsl(50,70%,50%)" strokeWidth="0.4" /> {/* Kidney L */}
              <ellipse cx="115" cy="175" rx="6" ry="6" fill="hsl(50,70%,50%)" opacity="0.08" stroke="hsl(50,70%,50%)" strokeWidth="0.4" /> {/* Kidney R */}
              
              {/* Left Arm */}
              <path d="M 58 85 Q 45 90 38 110 L 30 150 Q 28 160 30 165 L 25 200 Q 22 210 20 220 L 15 240"
                fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
              {/* Left Hand */}
              <ellipse cx="13" cy="248" rx="8" ry="12" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="0.8" opacity="0.5" />
              
              {/* Right Arm */}
              <path d="M 142 85 Q 155 90 162 110 L 170 150 Q 172 160 170 165 L 175 200 Q 178 210 180 220 L 185 240"
                fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
              {/* Right Hand */}
              <ellipse cx="187" cy="248" rx="8" ry="12" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="0.8" opacity="0.5" />
              
              {/* Left Leg */}
              <path d="M 80 215 Q 75 240 73 280 L 72 320 Q 72 340 74 360 L 76 400 Q 77 420 78 440"
                fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
              {/* Left Foot */}
              <path d="M 78 440 Q 78 450 70 455 L 60 458" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1" opacity="0.5" />
              
              {/* Right Leg */}
              <path d="M 120 215 Q 125 240 127 280 L 128 320 Q 128 340 126 360 L 124 400 Q 123 420 122 440"
                fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
              {/* Right Foot */}
              <path d="M 122 440 Q 122 450 130 455 L 140 458" fill="none" stroke="hsl(200,100%,50%)" strokeWidth="1" opacity="0.5" />
              
              {/* Knee indicators */}
              <circle cx="73" cy="340" r="5" fill="none" stroke="hsl(180,60%,45%)" strokeWidth="0.5" opacity="0.4" />
              <circle cx="127" cy="340" r="5" fill="none" stroke="hsl(180,60%,45%)" strokeWidth="0.5" opacity="0.4" />
              
              {/* Nervous system lines */}
              <line x1="100" y1="62" x2="100" y2="35" stroke="hsl(270,80%,60%)" strokeWidth="0.3" opacity="0.3" />
              <line x1="100" y1="215" x2="73" y2="440" stroke="hsl(270,80%,60%)" strokeWidth="0.3" opacity="0.15" />
              <line x1="100" y1="215" x2="127" y2="440" stroke="hsl(270,80%,60%)" strokeWidth="0.3" opacity="0.15" />
              
              {/* Circulatory highlights */}
              {[120, 140, 160, 180, 200].map((y, i) => (
                <circle key={`blood-${i}`} cx={100 + Math.sin(y) * 5} cy={y} r="1" fill="hsl(0,80%,50%)" opacity="0.3">
                  <animate attributeName="opacity" values="0.1;0.4;0.1" dur={`${1 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>

            {/* Clickable hotspots */}
            {filteredParts.map(part => (
              <button
                key={part.id}
                className={`absolute w-4 h-4 rounded-full transition-all duration-300 -translate-x-1/2 -translate-y-1/2 group ${
                  selectedPart?.id === part.id ? 'z-20' : 'z-10'
                }`}
                style={{ top: part.position.top, left: part.position.left }}
                onClick={() => setSelectedPart(part)}
                onMouseEnter={() => setHoveredPart(part.id)}
                onMouseLeave={() => setHoveredPart(null)}
              >
                <span
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{
                    backgroundColor: systemColors[part.system],
                    opacity: selectedPart?.id === part.id ? 0.4 : 0.15,
                  }}
                />
                <span
                  className="absolute inset-0.5 rounded-full border"
                  style={{
                    backgroundColor: selectedPart?.id === part.id ? systemColors[part.system] : 'transparent',
                    borderColor: systemColors[part.system],
                    boxShadow: hoveredPart === part.id ? `0 0 10px ${systemColors[part.system]}` : 'none',
                  }}
                />
                {/* Tooltip on hover */}
                {(hoveredPart === part.id && selectedPart?.id !== part.id) && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[hsl(220,25%,15%)] border border-[hsl(200,80%,30%)]/40 whitespace-nowrap text-[10px] font-medium pointer-events-none"
                    style={{ color: systemColors[part.system] }}>
                    {part.name}
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* HUD corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-[hsl(200,100%,50%)]/30" />
          <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-[hsl(200,100%,50%)]/30" />
          <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-[hsl(200,100%,50%)]/30" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-[hsl(200,100%,50%)]/30" />
          
          {/* Stats overlay */}
          <div className="absolute top-6 left-6 text-[10px] text-[hsl(200,60%,40%)] space-y-1">
            <div>SCAN MODE: ACTIVE</div>
            <div>PARTS: {filteredParts.length} / {bodyParts.length}</div>
            <div>ZOOM: {Math.round(zoom * 100)}%</div>
          </div>
        </div>

        {/* Right Panel - Detail */}
        <div className="w-80 bg-[hsl(220,25%,10%)] border-l border-[hsl(200,80%,30%)]/20 flex flex-col">
          {selectedPart ? (
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge style={{ backgroundColor: systemColors[selectedPart.system], color: 'white' }} className="text-[10px]">
                      {selectedPart.system}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] border-[hsl(200,80%,30%)]/40 text-[hsl(200,60%,60%)]">
                      {selectedPart.category === "major" ? "Major Organ" : "Minor Structure"}
                    </Badge>
                  </div>
                  <h2 className="text-xl font-bold text-[hsl(200,100%,80%)]">{selectedPart.name}</h2>
                </div>

                {/* Description */}
                <div className="p-3 rounded-lg bg-[hsl(220,25%,13%)] border border-[hsl(200,80%,30%)]/15">
                  <p className="text-sm text-[hsl(200,60%,60%)] leading-relaxed">{selectedPart.description}</p>
                </div>

                {/* Functions */}
                <div>
                  <h3 className="text-xs font-semibold text-[hsl(200,80%,50%)] uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Key Functions
                  </h3>
                  <div className="space-y-1.5">
                    {selectedPart.functions.map((fn, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded bg-[hsl(220,25%,13%)] border border-[hsl(200,80%,30%)]/10">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: systemColors[selectedPart.system] }} />
                        <span className="text-sm text-[hsl(200,60%,65%)]">{fn}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conditions */}
                <div>
                  <h3 className="text-xs font-semibold text-[hsl(0,70%,60%)] uppercase tracking-wider mb-2">Common Conditions</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPart.conditions.map((cond, i) => (
                      <Badge key={i} variant="outline" className="text-[11px] border-[hsl(0,50%,40%)]/40 text-[hsl(0,60%,65%)] bg-[hsl(0,50%,20%)]/10">
                        {cond}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Vitals simulation */}
                <div className="p-3 rounded-lg bg-[hsl(220,25%,13%)] border border-[hsl(200,80%,30%)]/15">
                  <h3 className="text-xs font-semibold text-[hsl(140,60%,50%)] uppercase tracking-wider mb-2">Scan Status</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-[hsl(200,40%,50%)]">Structural Integrity</span>
                      <span className="text-[hsl(140,70%,55%)]">98.2%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[hsl(220,25%,20%)] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[hsl(140,70%,40%)] to-[hsl(140,70%,55%)] rounded-full" style={{ width: '98.2%' }} />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[hsl(200,40%,50%)]">Function Level</span>
                      <span className="text-[hsl(200,80%,55%)]">Normal</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[hsl(200,40%,50%)]">Last Scanned</span>
                      <span className="text-[hsl(200,60%,55%)]">Just now</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-[hsl(200,80%,30%)]/10 flex items-center justify-center">
                  <Info className="w-8 h-8 text-[hsl(200,80%,40%)]" />
                </div>
                <h3 className="text-sm font-medium text-[hsl(200,60%,50%)]">Select a Body Part</h3>
                <p className="text-xs text-[hsl(200,40%,40%)]">Click on any hotspot on the body or select from the list to view detailed information about that anatomy.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scan line animation CSS */}
      <style>{`
        @keyframes scan {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BodyAnatomy;
