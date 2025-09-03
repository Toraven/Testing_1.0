export interface Translation {
  // Header
  title: string;
  subtitle: string;
  
  // Stats
  monthlySpend: string;
  activeSubscriptions: string;
  renewingSoon: string;
  
  // Search and filters
  searchPlaceholder: string;
  allStatuses: string;
  active: string;
  paused: string;
  cancelled: string;
  addSubscription: string;
  
  // Form
  addSubscriptionTitle: string;
  editSubscriptionTitle: string;
  selectService: string;
  serviceName: string;
  category: string;
  selectCategory: string;
  cost: string;
  billingPeriod: string;
  monthly: string;
  yearly: string;
  status: string;
  nextBillingDate: string;
  description: string;
  descriptionPlaceholder: string;
  update: string;
  add: string;
  cancel: string;
  otherService: string;
  enterServiceName: string;
  
  // Status labels
  activeStatus: string;
  pausedStatus: string;
  cancelledStatus: string;
  
  // Subscription card
  nextPayment: string;
  
  // Empty state
  noSubscriptions: string;
  noSubscriptionsFound: string;
  noSubscriptionsDescription: string;
  noSubscriptionsFoundDescription: string;
  
  // Delete confirmation
  deleteConfirmation: string;
  
  // Billing cycles
  perMonth: string;
  perYear: string;
}

export const translations: Record<string, Translation> = {
  ru: {
    title: "AI Subscription Manager",
    subtitle: "Управляйте всеми своими AI-подписками в одном месте",
    
    monthlySpend: "Месячные расходы",
    activeSubscriptions: "Активные подписки",
    renewingSoon: "Скоро продление",
    
    searchPlaceholder: "Поиск подписок...",
    allStatuses: "Все статусы",
    active: "Активные",
    paused: "Приостановленные",
    cancelled: "Отмененные",
    addSubscription: "Добавить подписку",
    
    addSubscriptionTitle: "Добавить подписку",
    editSubscriptionTitle: "Редактировать подписку",
    selectService: "Выберите сервис",
    serviceName: "Название сервиса",
    category: "Категория",
    selectCategory: "Выберите категорию",
    cost: "Стоимость ($)",
    billingPeriod: "Период оплаты",
    monthly: "Ежемесячно",
    yearly: "Ежегодно",
    status: "Статус",
    nextBillingDate: "Дата следующего платежа",
    description: "Описание (опционально)",
    descriptionPlaceholder: "Дополнительные заметки о подписке...",
    update: "Обновить",
    add: "Добавить",
    cancel: "Отмена",
    otherService: "Другой сервис (ввести вручную)",
    enterServiceName: "Введите название сервиса...",
    
    activeStatus: "Активна",
    pausedStatus: "Приостановлена",
    cancelledStatus: "Отменена",
    
    nextPayment: "Следующий платеж",
    
    noSubscriptions: "Нет подписок",
    noSubscriptionsFound: "Подписки не найдены",
    noSubscriptionsDescription: "Добавьте свою первую AI-подписку для начала отслеживания",
    noSubscriptionsFoundDescription: "Попробуйте изменить фильтры или поисковый запрос",
    
    deleteConfirmation: "Вы уверены, что хотите удалить эту подписку?",
    
    perMonth: "/мес",
    perYear: "/год"
  },
  
  en: {
    title: "AI Subscription Manager",
    subtitle: "Manage all your AI subscriptions in one place",
    
    monthlySpend: "Monthly Spend",
    activeSubscriptions: "Active Subscriptions",
    renewingSoon: "Renewing Soon",
    
    searchPlaceholder: "Search subscriptions...",
    allStatuses: "All Statuses",
    active: "Active",
    paused: "Paused",
    cancelled: "Cancelled",
    addSubscription: "Add Subscription",
    
    addSubscriptionTitle: "Add Subscription",
    editSubscriptionTitle: "Edit Subscription",
    selectService: "Select Service",
    serviceName: "Service Name",
    category: "Category",
    selectCategory: "Select Category",
    cost: "Cost ($)",
    billingPeriod: "Billing Period",
    monthly: "Monthly",
    yearly: "Yearly",
    status: "Status",
    nextBillingDate: "Next Billing Date",
    description: "Description (optional)",
    descriptionPlaceholder: "Additional notes about subscription...",
    update: "Update",
    add: "Add",
    cancel: "Cancel",
    otherService: "Other service (enter manually)",
    enterServiceName: "Enter service name...",
    
    activeStatus: "Active",
    pausedStatus: "Paused",
    cancelledStatus: "Cancelled",
    
    nextPayment: "Next Payment",
    
    noSubscriptions: "No Subscriptions",
    noSubscriptionsFound: "No Subscriptions Found",
    noSubscriptionsDescription: "Add your first AI subscription to start tracking",
    noSubscriptionsFoundDescription: "Try changing your filters or search query",
    
    deleteConfirmation: "Are you sure you want to delete this subscription?",
    
    perMonth: "/mo",
    perYear: "/yr"
  }
};