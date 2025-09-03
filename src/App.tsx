import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CreditCard, 
  Calendar, 
  DollarSign,
  Bot,
  Edit3,
  Trash2,
  CheckCircle,
  PauseCircle,
  XCircle,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { translations, Translation } from './translations';

interface Subscription {
  id: string;
  name: string;
  category: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'paused' | 'cancelled';
  nextBilling: string;
  description?: string;
}

const categories = [
  'ChatGPT/Language Models',
  'Image Generation',
  'Code Assistant',
  'Data Analytics',
  'Voice/Audio AI',
  'Video Generation',
  'Music/Audio Generation',
  'Writing Assistant',
  'Translation Services',
  'OCR/Document Processing',
  'Automation/Workflow',
  'Research Assistant',
  'Design Tools',
  'Marketing AI',
  'SEO Tools',
  'Social Media AI',
  'Email Assistant',
  'Presentation Tools',
  'Photo Editing',
  'Content Creation',
  'Chatbots/Customer Service',
  'Productivity Tools',
  'Learning/Education',
  'Health/Fitness AI',
  'Finance/Trading AI',
  'Gaming AI',
  'Security/Privacy',
  'API Services',
  'Other'
];

const servicesByCategory: Record<string, string[]> = {
  'ChatGPT/Language Models': [
    'ChatGPT Plus', 'ChatGPT Team', 'Claude Pro', 'Claude Team', 'Gemini Advanced', 
    'Perplexity Pro', 'Poe', 'Character.AI Plus', 'Replika Pro', 'Jasper AI',
    'Copy.ai Pro', 'Writesonic', 'Rytr', 'QuillBot Premium'
  ],
  'Image Generation': [
    'Midjourney', 'DALL-E 3', 'Stable Diffusion Plus', 'Adobe Firefly',
    'Canva Pro', 'Runway ML', 'Leonardo.ai', 'Artbreeder', 'NightCafe',
    'DeepAI Pro', 'Craiyon Pro', 'Photosonic'
  ],
  'Code Assistant': [
    'GitHub Copilot', 'Cursor Pro', 'Tabnine Pro', 'CodeWhisperer',
    'Replit Hacker', 'Codeium Pro', 'Sourcegraph Cody', 'DeepCode',
    'Kite Pro', 'IntelliCode'
  ],
  'Data Analytics': [
    'DataRobot', 'H2O.ai', 'Tableau with Einstein', 'Power BI Premium',
    'Alteryx Designer', 'Palantir Foundry', 'Databricks', 'Snowflake',
    'Looker', 'Sisense'
  ],
  'Voice/Audio AI': [
    'ElevenLabs Pro', 'Murf AI', 'Speechify Premium', 'Descript Pro',
    'Otter.ai Pro', 'Rev.ai', 'Sonantic', 'Resemble AI', 'WellSaid Labs',
    'Synthesis.io'
  ],
  'Video Generation': [
    'Runway ML Pro', 'Synthesia Personal', 'Loom AI', 'Pictory AI',
    'InVideo Pro', 'Fliki Pro', 'Steve.ai', 'Animoto Pro', 'Vyond Pro',
    'Hour One'
  ],
  'Music/Audio Generation': [
    'AIVA Pro', 'Amper Music', 'Soundraw Pro', 'Boomy Pro', 'Ecrett Music',
    'Beatoven.ai', 'Mubert Pro', 'Loudly Pro', 'Soundful Pro', 'Jukedeck'
  ],
  'Writing Assistant': [
    'Grammarly Premium', 'ProWritingAid Premium', 'Hemingway Editor Plus',
    'Wordtune Premium', 'Notion AI', 'Lex', 'Sudowrite', 'NovelAI',
    'ShortlyAI', 'Article Forge'
  ],
  'Translation Services': [
    'DeepL Pro', 'Google Translate API', 'Microsoft Translator', 'Reverso Premium',
    'Linguee Premium', 'SYSTRAN Pure Neural', 'SDL Trados', 'Phrase',
    'Lokalise', 'Crowdin Enterprise'
  ],
  'OCR/Document Processing': [
    'Adobe Acrobat Pro', 'ABBYY FineReader', 'Tesseract Premium', 'Nanonets',
    'Docparser', 'Rossum', 'Mindee', 'Klippa', 'Extractable', 'FormX'
  ],
  'Automation/Workflow': [
    'Zapier Professional', 'Make Premium', 'UiPath', 'Automation Anywhere',
    'Blue Prism', 'Microsoft Power Automate', 'Nintex', 'ProcessStreet',
    'Monday.com Pro', 'Airtable Pro'
  ],
  'Research Assistant': [
    'Semantic Scholar API', 'Elicit Plus', 'Consensus Premium', 'ResearchGate Premium',
    'Zotero Premium', 'Mendeley Premium', 'Scholarcy Premium', 'SciSpace Pro',
    'Connected Papers Pro', 'Iris.ai'
  ],
  'Design Tools': [
    'Figma Professional', 'Adobe Creative Cloud', 'Sketch', 'Canva Pro',
    'Framer Pro', 'InVision Pro', 'Marvel Pro', 'Principle', 'ProtoPie',
    'Zeplin'
  ],
  'Marketing AI': [
    'HubSpot Marketing Hub', 'Marketo Engage', 'Pardot', 'Mailchimp Premium',
    'Constant Contact Plus', 'Campaign Monitor Premium', 'GetResponse MAX',
    'ActiveCampaign Plus', 'ConvertKit Creator Pro', 'Drip Pro'
  ],
  'SEO Tools': [
    'SEMrush Pro', 'Ahrefs Standard', 'Moz Pro', 'Screaming Frog SEO Spider',
    'Majestic Premium', 'SpyFu Professional', 'KWFinder Premium', 'Serpstat',
    'BrightEdge', 'Conductor'
  ],
  'Social Media AI': [
    'Hootsuite Professional', 'Buffer Pro', 'Sprout Social Standard',
    'Later Premium', 'SocialBee Premium', 'MeetEdgar', 'Loomly Premium',
    'CoSchedule Pro', 'Sendible Premium', 'Agorapulse Pro'
  ],
  'Email Assistant': [
    'Boomerang Premium', 'Mixmax Premium', 'Outreach Pro', 'SalesLoft',
    'HubSpot Sales Hub', 'Mailshake', 'Reply.io', 'Woodpecker.co',
    'Lemlist', 'Apollo.io'
  ],
  'Presentation Tools': [
    'Beautiful.ai Pro', 'Gamma Plus', 'Tome Pro', 'Slidebean Premium',
    'Prezi Plus', 'Canva Pro', 'Pitch Pro', 'Genially Premium',
    'Visme Premium', 'Haiku Deck Premium'
  ],
  'Photo Editing': [
    'Adobe Photoshop', 'Adobe Lightroom', 'Luminar AI', 'Skylum Aurora HDR',
    'Topaz Labs AI', 'ON1 Photo RAW', 'Capture One Pro', 'Affinity Photo',
    'GIMP Premium', 'Canva Pro'
  ],
  'Content Creation': [
    'Loom Pro', 'Camtasia', 'ScreenFlow', 'OBS Studio Pro', 'Filmora Pro',
    'Adobe Premiere Pro', 'Final Cut Pro', 'DaVinci Resolve Studio',
    'Kapwing Pro', 'InVideo Pro'
  ],
  'Chatbots/Customer Service': [
    'Intercom Pro', 'Zendesk Chat', 'Drift Premium', 'Tidio Premium',
    'LiveChat Premium', 'Freshchat Pro', 'Crisp Pro', 'Tawk.to Premium',
    'Olark Pro', 'Pure Chat Pro'
  ],
  'Productivity Tools': [
    'Notion Pro', 'Obsidian Catalyst', 'Roam Research Pro', 'RemNote Pro',
    'Logseq Pro', 'Craft Premium', 'Bear Pro', 'Ulysses Premium',
    'Scrivener', 'MindMeister Pro'
  ],
  'Learning/Education': [
    'Coursera Plus', 'Udemy Pro', 'MasterClass', 'Skillshare Premium',
    'LinkedIn Learning Premium', 'Pluralsight Premium', 'Codecademy Pro',
    'DataCamp Premium', 'edX Verified Certificate', 'Khan Academy'
  ],
  'Health/Fitness AI': [
    'MyFitnessPal Premium', 'Noom Premium', 'Fitbit Premium', 'Strava Premium',
    'Nike Training Club Premium', 'Peloton Digital', 'Calm Premium',
    'Headspace Plus', 'Sleep Cycle Premium', 'Oura Ring Membership'
  ],
  'Finance/Trading AI': [
    'TradingView Pro', 'Bloomberg Terminal', 'Refinitiv Eikon', 'FactSet',
    'Morningstar Premium', 'YCharts Professional', 'S&P Capital IQ',
    'PitchBook', 'CB Insights', 'Crunchbase Pro'
  ],
  'Gaming AI': [
    'NVIDIA GeForce Now', 'Google Stadia Pro', 'Xbox Game Pass Ultimate',
    'PlayStation Plus Premium', 'EA Play Pro', 'Ubisoft Plus',
    'Apple Arcade', 'Amazon Luna Plus', 'Shadow PC', 'Parsec Pro'
  ],
  'Security/Privacy': [
    'NordVPN', 'ExpressVPN', 'Surfshark', 'CyberGhost VPN', 'ProtonVPN Plus',
    'Bitdefender Premium', 'Norton 360', 'Kaspersky Premium', 'McAfee Total Protection',
    'Malwarebytes Premium'
  ],
  'API Services': [
    'OpenAI API', 'Anthropic Claude API', 'Google Cloud AI APIs', 'AWS AI Services',
    'Microsoft Azure Cognitive Services', 'IBM Watson APIs', 'Hugging Face Pro',
    'Cohere API', 'AI21 Labs API', 'Stability AI API'
  ]
};

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
  paused: { icon: PauseCircle, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' }
};

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    billingCycle: 'monthly' as const,
    status: 'active' as const,
    nextBilling: '',
    description: ''
  });

  const availableServices = formData.category ? servicesByCategory[formData.category] || [] : [];
  const showServiceDropdown = availableServices.length > 0;
  const t: Translation = translations[language];

  useEffect(() => {
    const saved = localStorage.getItem('ai-subscriptions');
    if (saved) {
      setSubscriptions(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai-subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subscription: Subscription = {
      id: editingId || Date.now().toString(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      billingCycle: formData.billingCycle,
      status: formData.status,
      nextBilling: formData.nextBilling,
      description: formData.description
    };

    if (editingId) {
      setSubscriptions(prev => prev.map(sub => sub.id === editingId ? subscription : sub));
    } else {
      setSubscriptions(prev => [...prev, subscription]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      billingCycle: 'monthly',
      status: 'active',
      nextBilling: '',
      description: ''
    });
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category,
      name: '' // Reset service name when category changes
    }));
  };
  const handleEdit = (subscription: Subscription) => {
    setFormData({
      name: subscription.name,
      category: subscription.category,
      price: subscription.price.toString(),
      billingCycle: subscription.billingCycle,
      status: subscription.status,
      nextBilling: subscription.nextBilling,
      description: subscription.description || ''
    });
    setEditingId(subscription.id);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(t.deleteConfirmation)) {
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalMonthlySpend = subscriptions
    .filter(sub => sub.status === 'active')
    .reduce((total, sub) => {
      const monthlyPrice = sub.billingCycle === 'yearly' ? sub.price / 12 : sub.price;
      return total + monthlyPrice;
    }, 0);

  const getUpcomingRenewals = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return subscriptions.filter(sub => {
      if (sub.status !== 'active') return false;
      const renewalDate = new Date(sub.nextBilling);
      return renewalDate >= today && renewalDate <= nextWeek;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-lg">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  language === 'ru' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                  language === 'en' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Globe className="w-4 h-4" />
                EN
              </button>
            </div>
          </div>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-lg text-gray-600">{t.subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.monthlySpend}</p>
                <p className="text-2xl font-bold text-gray-900">${totalMonthlySpend.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.activeSubscriptions}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {subscriptions.filter(sub => sub.status === 'active').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.renewingSoon}</p>
                <p className="text-2xl font-bold text-gray-900">{getUpcomingRenewals().length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all appearance-none bg-white"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">{t.allStatuses}</option>
                  <option value="active">{t.active}</option>
                  <option value="paused">{t.paused}</option>
                  <option value="cancelled">{t.cancelled}</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {t.addSubscription}
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? t.editSubscriptionTitle : t.addSubscriptionTitle}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {showServiceDropdown ? t.selectService : t.serviceName}
                    </label>
                    {showServiceDropdown ? (
                      <select
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                      >
                        <option value="">{t.selectService}</option>
                        {availableServices.map(service => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                        <option value="custom">{t.otherService}</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                        placeholder={t.enterServiceName}
                      />
                    )}
                    
                    {formData.name === 'custom' && (
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all mt-2"
                        placeholder={t.enterServiceName}
                        onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                      />
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.category}
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.category}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                    >
                      <option value="">{t.selectCategory}</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.cost}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({...prev, price: e.target.value}))}
                      placeholder="20.00"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.billingPeriod}
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.billingCycle}
                      onChange={(e) => setFormData(prev => ({...prev, billingCycle: e.target.value as 'monthly' | 'yearly'}))}
                    >
                      <option value="monthly">{t.monthly}</option>
                      <option value="yearly">{t.yearly}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.status}
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({...prev, status: e.target.value as 'active' | 'paused' | 'cancelled'}))}
                    >
                      <option value="active">{t.activeStatus}</option>
                      <option value="paused">{t.pausedStatus}</option>
                      <option value="cancelled">{t.cancelledStatus}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.nextBillingDate}
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.nextBilling}
                      onChange={(e) => setFormData(prev => ({...prev, nextBilling: e.target.value}))}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.description}
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    placeholder={t.descriptionPlaceholder}
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    {editingId ? t.update : t.add}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    {t.cancel}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Subscriptions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubscriptions.map((subscription) => {
            const StatusIcon = statusConfig[subscription.status].icon;
            const isExpiringSoon = getUpcomingRenewals().some(sub => sub.id === subscription.id);
            
            return (
              <div
                key={subscription.id}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {subscription.name}
                    </h3>
                    <p className="text-sm text-gray-600">{subscription.category}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(subscription)}
                      className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(subscription.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{t.cost.replace(' ($)', '')}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      ${subscription.price.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500">
                        {subscription.billingCycle === 'monthly' ? t.perMonth : t.perYear}
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{t.nextPayment}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isExpiringSoon && (
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                      )}
                      <span className={`text-sm font-medium ${isExpiringSoon ? 'text-orange-600' : 'text-gray-900'}`}>
                        {new Date(subscription.nextBilling).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{t.status}</span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[subscription.status].bg}`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig[subscription.status].color}`} />
                      <span className={`text-sm font-medium ${statusConfig[subscription.status].color}`}>
                        {subscription.status === 'active' ? t.activeStatus : 
                         subscription.status === 'paused' ? t.pausedStatus : t.cancelledStatus}
                      </span>
                    </div>
                  </div>
                  
                  {subscription.description && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-gray-600">{subscription.description}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {subscriptions.length === 0 ? t.noSubscriptions : t.noSubscriptionsFound}
            </h3>
            <p className="text-gray-600 mb-4">
              {subscriptions.length === 0
                ? t.noSubscriptionsDescription
                : t.noSubscriptionsFoundDescription
              }
            </p>
            {subscriptions.length === 0 && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t.addSubscription}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;