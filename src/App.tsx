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
  AlertTriangle
} from 'lucide-react';

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
  'Other'
];

const statusConfig = {
  active: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', label: 'Активна' },
  paused: { icon: PauseCircle, color: 'text-yellow-500', bg: 'bg-yellow-50', label: 'Приостановлена' },
  cancelled: { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', label: 'Отменена' }
};

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    billingCycle: 'monthly' as const,
    status: 'active' as const,
    nextBilling: '',
    description: ''
  });

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
    if (confirm('Вы уверены, что хотите удалить эту подписку?')) {
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
    <div className="min-h-screen bg-gradient-to-br from-red-400 via-red-500 to-red-600">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Subscription Manager</h1>
          <p className="text-lg text-gray-600">Управляйте всеми своими AI-подписками в одном месте</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Месячные расходы</p>
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
                <p className="text-sm font-medium text-gray-600">Активные подписки</p>
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
                <p className="text-sm font-medium text-gray-600">Скоро продление</p>
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
                  placeholder="Поиск подписок..."
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
                  <option value="all">Все статусы</option>
                  <option value="active">Активные</option>
                  <option value="paused">Приостановленные</option>
                  <option value="cancelled">Отмененные</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Добавить подписку
            </button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Редактировать подписку' : 'Добавить подписку'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название сервиса
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                      placeholder="ChatGPT Plus, Midjourney..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Категория
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({...prev, category: e.target.value}))}
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Стоимость ($)
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
                      Период оплаты
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.billingCycle}
                      onChange={(e) => setFormData(prev => ({...prev, billingCycle: e.target.value as 'monthly' | 'yearly'}))}
                    >
                      <option value="monthly">Ежемесячно</option>
                      <option value="yearly">Ежегодно</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Статус
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({...prev, status: e.target.value as 'active' | 'paused' | 'cancelled'}))}
                    >
                      <option value="active">Активна</option>
                      <option value="paused">Приостановлена</option>
                      <option value="cancelled">Отменена</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Дата следующего платежа
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
                    Описание (опционально)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                    placeholder="Дополнительные заметки о подписке..."
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    {editingId ? 'Обновить' : 'Добавить'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
                  >
                    Отмена
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
                      <span className="text-sm text-gray-600">Стоимость</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      ${subscription.price.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500">
                        /{subscription.billingCycle === 'monthly' ? 'мес' : 'год'}
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Следующий платеж</span>
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
                    <span className="text-sm text-gray-600">Статус</span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig[subscription.status].bg}`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig[subscription.status].color}`} />
                      <span className={`text-sm font-medium ${statusConfig[subscription.status].color}`}>
                        {statusConfig[subscription.status].label}
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
              {subscriptions.length === 0 ? 'Нет подписок' : 'Подписки не найдены'}
            </h3>
            <p className="text-gray-600 mb-4">
              {subscriptions.length === 0
                ? 'Добавьте свою первую AI-подписку для начала отслеживания'
                : 'Попробуйте изменить фильтры или поисковый запрос'
              }
            </p>
            {subscriptions.length === 0 && (
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Добавить подписку
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;