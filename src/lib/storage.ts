import { BrandSettings, Product, CustomerPersona, CalendarEvent, SavedFolder, GeneratedContent, GeneratedCampaign, TaskItem } from '../types';
import { initialBrandSettings, initialProducts, initialPersonas, initialCalendarEvents, initialSavedFolders, initialTasks, sampleInitialCaptions } from '../data/mockInitialData';

const STORAGE_KEYS = {
  BRAND: 'tup_ai_brand',
  PRODUCTS: 'tup_ai_products',
  PERSONAS: 'tup_ai_personas',
  CALENDAR: 'tup_ai_calendar',
  SAVED_FOLDERS: 'tup_ai_folders',
  TASKS: 'tup_ai_tasks',
  SAVED_CONTENT: 'tup_ai_saved_content',
  SAVED_CAMPAIGNS: 'tup_ai_saved_campaigns',
};

export const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save key ${key} to storage`, e);
  }
};

export const loadBrandSettings = (): BrandSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.BRAND);
    return saved ? JSON.parse(saved) : initialBrandSettings;
  } catch {
    return initialBrandSettings;
  }
};

export const saveBrandSettings = (brand: BrandSettings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(brand));
  } catch (e) {
    console.error('Failed to save brand settings', e);
  }
};

export const loadProducts = (): Product[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return saved ? JSON.parse(saved) : initialProducts;
  } catch {
    return initialProducts;
  }
};

export const saveProducts = (products: Product[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products', e);
  }
};

export const loadPersonas = (): CustomerPersona[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.PERSONAS);
    return saved ? JSON.parse(saved) : initialPersonas;
  } catch {
    return initialPersonas;
  }
};

export const savePersonas = (personas: CustomerPersona[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PERSONAS, JSON.stringify(personas));
  } catch (e) {
    console.error('Failed to save personas', e);
  }
};

export const loadCalendarEvents = (): CalendarEvent[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CALENDAR);
    return saved ? JSON.parse(saved) : initialCalendarEvents;
  } catch {
    return initialCalendarEvents;
  }
};

export const saveCalendarEvents = (events: CalendarEvent[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(events));
  } catch (e) {
    console.error('Failed to save calendar events', e);
  }
};

export const loadSavedFolders = (): SavedFolder[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_FOLDERS);
    return saved ? JSON.parse(saved) : initialSavedFolders;
  } catch {
    return initialSavedFolders;
  }
};

export const saveSavedFolders = (folders: SavedFolder[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_FOLDERS, JSON.stringify(folders));
  } catch (e) {
    console.error('Failed to save folders', e);
  }
};

export const loadTasks = (): TaskItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : initialTasks;
  } catch {
    return initialTasks;
  }
};

export const saveTasks = (tasks: TaskItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks', e);
  }
};

export const loadSavedContent = (): GeneratedContent[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.SAVED_CONTENT);
    return saved ? JSON.parse(saved) : sampleInitialCaptions;
  } catch {
    return sampleInitialCaptions;
  }
};

export const saveSavedContent = (content: GeneratedContent[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SAVED_CONTENT, JSON.stringify(content));
  } catch (e) {
    console.error('Failed to save content', e);
  }
};
