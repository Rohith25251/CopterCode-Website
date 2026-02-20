/**
 * Centralized Icon Library for CopterCode Sanity Integration
 * 
 * This file defines all available icons used across the website.
 * Icons are sourced from Lucide React library.
 * Update this file to add/remove icons globally across all pages.
 */

import {
    Briefcase, Users, Shield, ShieldCheck, Target, Award, Handshake, Truck,
    Globe, Server, Database, Cloud, Cpu, Smartphone, Layout, Code, Layers, Wifi, Radio,
    BarChart, PieChart, TrendingUp, Activity,
    File, FileText,
    Heart, Star, Zap, Lightbulb, Smile, ThumbsUp,
    Leaf, Sun, CloudRain,
    Rocket, Building, Factory, Drill, Plane,
    Coffee, Book, GraduationCap,
    MessageSquare, Phone, Mail,
    CheckCircle, XCircle, Plus, Download, Upload
} from 'lucide-react';

export const iconsList = [
    // Business & Professional
    { title: 'Briefcase', value: 'briefcase', category: 'Business' },
    { title: 'Users', value: 'users', category: 'Business' },
    { title: 'Shield', value: 'shield', category: 'Business' },
    { title: 'Shield Check', value: 'shieldCheck', category: 'Business' },
    { title: 'Target', value: 'target', category: 'Business' },
    { title: 'Award', value: 'award', category: 'Business' },
    { title: 'Handshake', value: 'handshake', category: 'Business' },
    { title: 'Truck', value: 'truck', category: 'Business' },
    
    // Technology & Data
    { title: 'Globe', value: 'globe', category: 'Technology' },
    { title: 'Server', value: 'server', category: 'Technology' },
    { title: 'Database', value: 'database', category: 'Technology' },
    { title: 'Cloud', value: 'cloud', category: 'Technology' },
    { title: 'CPU', value: 'cpu', category: 'Technology' },
    { title: 'Smartphone', value: 'smartphone', category: 'Technology' },
    { title: 'Layout', value: 'layout', category: 'Technology' },
    { title: 'Code', value: 'code', category: 'Technology' },
    { title: 'Layers', value: 'layers', category: 'Technology' },
    { title: 'Wifi', value: 'wifi', category: 'Technology' },
    { title: 'Radio', value: 'radio', category: 'Technology' },
    
    // Charts & Analytics
    { title: 'Chart', value: 'chart', category: 'Analytics' },
    { title: 'Pie Chart', value: 'piechart', category: 'Analytics' },
    { title: 'Bar Chart', value: 'barChart', category: 'Analytics' },
    { title: 'Trending Up', value: 'trendingUp', category: 'Analytics' },
    { title: 'Activity', value: 'activity', category: 'Analytics' },
    
    // Documents & Files
    { title: 'File', value: 'file', category: 'Documents' },
    { title: 'File Text', value: 'fileText', category: 'Documents' },
    
    // Emotions & Status
    { title: 'Heart', value: 'heart', category: 'Emotions' },
    { title: 'Star', value: 'star', category: 'Emotions' },
    { title: 'Zap', value: 'zap', category: 'Emotions' },
    { title: 'Lightbulb', value: 'lightbulb', category: 'Emotions' },
    { title: 'Smile', value: 'smile', category: 'Emotions' },
    { title: 'Thumbs Up', value: 'thumbsUp', category: 'Emotions' },
    
    // Nature & Environment
    { title: 'Leaf', value: 'leaf', category: 'Nature' },
    { title: 'Sun', value: 'sun', category: 'Nature' },
    { title: 'Cloud Rain', value: 'cloudRain', category: 'Nature' },
    
    // Infrastructure & Growth
    { title: 'Rocket', value: 'rocket', category: 'Infrastructure' },
    { title: 'Building', value: 'building', category: 'Infrastructure' },
    { title: 'Factory', value: 'factory', category: 'Infrastructure' },
    { title: 'Drill', value: 'drill', category: 'Infrastructure' },
    
    // Lifestyle & Culture
    { title: 'Coffee', value: 'coffee', category: 'Lifestyle' },
    { title: 'Book', value: 'book', category: 'Lifestyle' },
    { title: 'Graduation Cap', value: 'graduationCap', category: 'Lifestyle' },
    { title: 'Users', value: 'users', category: 'Lifestyle' },
    
    // Communication & Connection
    { title: 'MessageSquare', value: 'messageSquare', category: 'Communication' },
    { title: 'Phone', value: 'phone', category: 'Communication' },
    { title: 'Mail', value: 'mail', category: 'Communication' },
    
    // Utility & Action
    { title: 'Check Circle', value: 'checkCircle', category: 'Utility' },
    { title: 'X Circle', value: 'xCircle', category: 'Utility' },
    { title: 'Plus', value: 'plus', category: 'Utility' },
    { title: 'Download', value: 'download', category: 'Utility' },
    { title: 'Upload', value: 'upload', category: 'Utility' },
    
    // UI Specific
    { title: 'Sustainability (Leaf)', value: 'sustainability', category: 'UI Specific' },
    { title: 'Innovation (Lightbulb)', value: 'innovation', category: 'UI Specific' },
    { title: 'Impact (Chart)', value: 'impact', category: 'UI Specific' }
];

/**
 * Get icon list for a specific category
 * @param {string} category - The category to filter by (e.g., 'Technology', 'Business')
 * @returns {array} Filtered icon list
 */
export const getIconsByCategory = (category) => {
    return iconsList.filter(icon => icon.category === category);
};

/**
 * Get all unique categories
 * @returns {array} Array of unique categories
 */
export const getIconCategories = () => {
    return [...new Set(iconsList.map(icon => icon.category))];
};

/**
 * Reusable icon field configuration for Sanity schemas
 * Use this in any schema field that needs icon selection
 * 
 * Example usage:
 * {
 *     name: 'icon',
 *     ...iconField
 * }
 */
export const iconField = {
    title: 'Icon (Lucide)',
    type: 'string',
    options: {
        list: iconsList.map(icon => ({
            title: `${icon.title} (${icon.category})`,
            value: icon.value
        }))
    }
};

/**
 * Reusable icon field with custom title
 * @param {string} customTitle - Custom title for the field
 * @returns {object} Icon field configuration
 */
export const createIconField = (customTitle = 'Icon (Lucide)') => {
    return {
        title: customTitle,
        type: 'string',
        options: {
            list: iconsList.map(icon => ({
                title: `${icon.title} (${icon.category})`,
                value: icon.value
            }))
        }
    };
};

/**
 * Basic icon list (minimal) for simpler use cases
 */
export const basicIconsList = [
    { title: 'Zap', value: 'zap' },
    { title: 'Award', value: 'award' },
    { title: 'Globe', value: 'globe' },
    { title: 'Heart', value: 'heart' },
    { title: 'Briefcase', value: 'briefcase' },
    { title: 'Shield', value: 'shield' },
    { title: 'Users', value: 'users' },
    { title: 'Target', value: 'target' },
    { title: 'Lightbulb', value: 'lightbulb' },
    { title: 'Star', value: 'star' }
];

/**
 * Basic icon field for quick implementation
 */
export const basicIconField = {
    title: 'Icon',
    type: 'string',
    options: {
        list: basicIconsList
    }
};

/**
 * CENTRALIZED ICON MAPPING
 * Maps icon values (strings) to Lucide React components
 * 
 * Usage in any component:
 * import { iconComponentMap } from '../sanity/schemas/icons';
 * const IconComponent = iconComponentMap[iconValue] || iconComponentMap.zap;
 * <IconComponent size={24} />
 */
export const iconComponentMap = {
    // Business & Professional
    briefcase: Briefcase,
    users: Users,
    shield: Shield,
    shieldCheck: ShieldCheck,
    target: Target,
    award: Award,
    handshake: Handshake,
    truck: Truck,
    
    // Technology & Data
    globe: Globe,
    server: Server,
    database: Database,
    cloud: Cloud,
    cpu: Cpu,
    smartphone: Smartphone,
    layout: Layout,
    code: Code,
    layers: Layers,
    wifi: Wifi,
    radio: Radio,
    
    // Charts & Analytics
    chart: BarChart,
    piechart: PieChart,
    barChart: BarChart,
    trendingUp: TrendingUp,
    activity: Activity,
    
    // Documents & Files
    file: File,
    fileText: FileText,
    
    // Emotions & Status
    heart: Heart,
    star: Star,
    zap: Zap,
    lightbulb: Lightbulb,
    smile: Smile,
    thumbsUp: ThumbsUp,
    
    // Nature & Environment
    leaf: Leaf,
    sun: Sun,
    cloudRain: CloudRain,
    
    // Infrastructure & Growth
    rocket: Rocket,
    building: Building,
    factory: Factory,
    drill: Drill,
    plane: Plane,
    
    // Lifestyle & Culture
    coffee: Coffee,
    book: Book,
    graduationCap: GraduationCap,
    
    // Communication & Connection
    messageSquare: MessageSquare,
    phone: Phone,
    mail: Mail,
    
    // Utility & Action
    checkCircle: CheckCircle,
    xCircle: XCircle,
    plus: Plus,
    download: Download,
    upload: Upload,
    
    // UI Specific (aliases)
    sustainability: Leaf,
    innovation: Lightbulb,
    impact: BarChart
};
