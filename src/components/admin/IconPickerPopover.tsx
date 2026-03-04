import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  Scissors, Leaf, Heart, Star, Sparkles, Crown, Shirt, Gem, Flower2,
  Sun, Moon, CloudSun, Flame, Droplets, Wind, Feather, Palette, Brush,
  PenTool, Ruler, Target, Award, Trophy, Medal, Gift, ShoppingBag,
  Watch, Glasses, Umbrella, Camera, Image, Film, Music, BookOpen,
  FileText, Mail, Phone, MapPin, Home, Building2, Globe, Plane,
  Car, Bike, Anchor, Rocket, Lightbulb, Zap, Battery, Wifi,
  CheckCircle2, XCircle, AlertTriangle, Info, HelpCircle, Bell,
  Clock, Calendar, Tag, Bookmark, Link, ExternalLink, Search,
  Eye, EyeOff, Lock, Unlock, Shield, Key, User, Users,
  ThumbsUp, ThumbsDown, MessageCircle, Share2, Send, Download,
  Upload, RefreshCw, RotateCw, ArrowRight, ArrowUp, TrendingUp,
  BarChart3, PieChart, Activity, Percent,
} from "lucide-react";

interface IconEntry {
  name: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
}

const ICONS: IconEntry[] = [
  { name: "scissors", Icon: Scissors }, { name: "leaf", Icon: Leaf }, { name: "heart", Icon: Heart },
  { name: "star", Icon: Star }, { name: "sparkles", Icon: Sparkles }, { name: "crown", Icon: Crown },
  { name: "shirt", Icon: Shirt }, { name: "gem", Icon: Gem }, { name: "flower", Icon: Flower2 },
  { name: "sun", Icon: Sun }, { name: "moon", Icon: Moon }, { name: "cloud-sun", Icon: CloudSun },
  { name: "flame", Icon: Flame }, { name: "droplets", Icon: Droplets }, { name: "wind", Icon: Wind },
  { name: "feather", Icon: Feather }, { name: "palette", Icon: Palette }, { name: "brush", Icon: Brush },
  { name: "pen-tool", Icon: PenTool }, { name: "ruler", Icon: Ruler }, { name: "target", Icon: Target },
  { name: "award", Icon: Award }, { name: "trophy", Icon: Trophy }, { name: "medal", Icon: Medal },
  { name: "gift", Icon: Gift }, { name: "shopping-bag", Icon: ShoppingBag }, { name: "watch", Icon: Watch },
  { name: "glasses", Icon: Glasses }, { name: "umbrella", Icon: Umbrella }, { name: "camera", Icon: Camera },
  { name: "image", Icon: Image }, { name: "film", Icon: Film }, { name: "music", Icon: Music },
  { name: "book-open", Icon: BookOpen }, { name: "file-text", Icon: FileText }, { name: "mail", Icon: Mail },
  { name: "phone", Icon: Phone }, { name: "map-pin", Icon: MapPin }, { name: "home", Icon: Home },
  { name: "building", Icon: Building2 }, { name: "globe", Icon: Globe }, { name: "plane", Icon: Plane },
  { name: "car", Icon: Car }, { name: "bike", Icon: Bike }, { name: "anchor", Icon: Anchor },
  { name: "rocket", Icon: Rocket }, { name: "lightbulb", Icon: Lightbulb }, { name: "zap", Icon: Zap },
  { name: "battery", Icon: Battery }, { name: "wifi", Icon: Wifi }, { name: "check-circle", Icon: CheckCircle2 },
  { name: "x-circle", Icon: XCircle }, { name: "alert", Icon: AlertTriangle }, { name: "info", Icon: Info },
  { name: "help", Icon: HelpCircle }, { name: "bell", Icon: Bell }, { name: "clock", Icon: Clock },
  { name: "calendar", Icon: Calendar }, { name: "tag", Icon: Tag }, { name: "bookmark", Icon: Bookmark },
  { name: "link", Icon: Link }, { name: "external-link", Icon: ExternalLink }, { name: "search", Icon: Search },
  { name: "eye", Icon: Eye }, { name: "eye-off", Icon: EyeOff }, { name: "lock", Icon: Lock },
  { name: "unlock", Icon: Unlock }, { name: "shield", Icon: Shield }, { name: "key", Icon: Key },
  { name: "user", Icon: User }, { name: "users", Icon: Users }, { name: "thumbs-up", Icon: ThumbsUp },
  { name: "thumbs-down", Icon: ThumbsDown }, { name: "message", Icon: MessageCircle }, { name: "share", Icon: Share2 },
  { name: "send", Icon: Send }, { name: "download", Icon: Download }, { name: "upload", Icon: Upload },
  { name: "refresh", Icon: RefreshCw }, { name: "rotate", Icon: RotateCw }, { name: "arrow-right", Icon: ArrowRight },
  { name: "arrow-up", Icon: ArrowUp }, { name: "trending-up", Icon: TrendingUp }, { name: "bar-chart", Icon: BarChart3 },
  { name: "pie-chart", Icon: PieChart }, { name: "activity", Icon: Activity }, { name: "percent", Icon: Percent },
];

export const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> =
  Object.fromEntries(ICONS.map((i) => [i.name, i.Icon]));

interface Props {
  onSelect: (iconName: string) => void;
  onClose: () => void;
}

export default function IconPickerPopover({ onSelect, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mountedAt = useRef(Date.now());
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (Date.now() - mountedAt.current < 100) return;
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const filtered = query
    ? ICONS.filter((i) => i.name.includes(query.toLowerCase()))
    : ICONS;

  return (
    <div
      ref={ref}
      style={{
        width: 320,
        maxHeight: 380,
        background: "#fff",
        border: "1px solid #E2E8DE",
        borderRadius: 12,
        boxShadow: "0 8px 30px rgba(0,0,0,.18)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "8px 10px", borderBottom: "1px solid #E2E8DE" }}>
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
          placeholder="Search icons..."
          style={{
            width: "100%",
            border: "1px solid #E2E8DE",
            borderRadius: 8,
            padding: "6px 10px",
            fontSize: 13,
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: 8,
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: 2,
        }}
      >
        {filtered.map((item) => (
          <button
            key={item.name}
            title={item.name}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(item.name);
            }}
            style={{
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              borderRadius: 6,
              background: "transparent",
              cursor: "pointer",
              color: "#2C2C2C",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "#EEF3EB"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            <item.Icon size={18} />
          </button>
        ))}
        {filtered.length === 0 && (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "#7A7A7A", fontSize: 12, padding: 20 }}>
            No icons found
          </p>
        )}
      </div>
    </div>
  );
}
