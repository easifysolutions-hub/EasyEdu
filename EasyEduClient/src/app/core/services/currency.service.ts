import { Injectable, signal, computed } from '@angular/core';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  label: string;
  flag: string;
  position: 'prefix' | 'suffix';
  decimals: number;
  numberSystem: 'indian' | 'international';
}

export const AVAILABLE_CURRENCIES: CurrencyConfig[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', label: 'INR (₹) - Indian Rupee (Default)', flag: '🇮🇳', position: 'prefix', decimals: 2, numberSystem: 'indian' },
  { code: 'USD', symbol: '$', name: 'US Dollar', label: 'USD ($) - United States Dollar', flag: '🇺🇸', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'EUR', symbol: '€', name: 'Euro', label: 'EUR (€) - European Union Euro', flag: '🇪🇺', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'GBP', symbol: '£', name: 'British Pound', label: 'GBP (£) - British Pound Sterling', flag: '🇬🇧', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', label: 'AED (د.إ) - UAE Dirham', flag: '🇦🇪', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', label: 'SAR (﷼) - Saudi Arabian Riyal', flag: '🇸🇦', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', label: 'CAD (C$) - Canadian Dollar', flag: '🇨🇦', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', label: 'AUD (A$) - Australian Dollar', flag: '🇦🇺', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', label: 'SGD (S$) - Singapore Dollar', flag: '🇸🇬', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', label: 'BDT (৳) - Bangladeshi Taka', flag: '🇧🇩', position: 'prefix', decimals: 2, numberSystem: 'indian' },
  { code: 'NPR', symbol: 'रू', name: 'Nepalese Rupee', label: 'NPR (रू) - Nepalese Rupee', flag: '🇳🇵', position: 'prefix', decimals: 2, numberSystem: 'indian' },
  { code: 'LKR', symbol: 'Rs', name: 'Sri Lankan Rupee', label: 'LKR (Rs) - Sri Lankan Rupee', flag: '🇱🇰', position: 'prefix', decimals: 2, numberSystem: 'indian' },
  { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', label: 'MYR (RM) - Malaysian Ringgit', flag: '🇲🇾', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'QAR', symbol: 'QR', name: 'Qatari Riyal', label: 'QAR (QR) - Qatari Riyal', flag: '🇶🇦', position: 'prefix', decimals: 2, numberSystem: 'international' },
  { code: 'KWD', symbol: 'KD', name: 'Kuwaiti Dinar', label: 'KWD (KD) - Kuwaiti Dinar', flag: '🇰🇼', position: 'prefix', decimals: 3, numberSystem: 'international' }
];

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private defaultCurrency: CurrencyConfig = AVAILABLE_CURRENCIES[0]; // INR Default

  activeCurrency = signal<CurrencyConfig>(this.loadInitialCurrency());

  symbol = computed(() => this.activeCurrency().symbol);
  code = computed(() => this.activeCurrency().code);

  constructor() {
    // Listen for storage events across tabs if needed
    window.addEventListener('storage', (e) => {
      if (e.key === 'easyedu_currency_config' && e.newValue) {
        try {
          this.activeCurrency.set(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Failed to sync currency storage', err);
        }
      }
    });
  }

  private loadInitialCurrency(): CurrencyConfig {
    const saved = localStorage.getItem('easyedu_currency_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const match = AVAILABLE_CURRENCIES.find(c => c.code === parsed.code);
        return match ? { ...match, ...parsed } : parsed;
      } catch (err) {
        console.warn('Failed to parse saved currency config', err);
      }
    }
    return { ...this.defaultCurrency };
  }

  setCurrency(config: Partial<CurrencyConfig> | string): void {
    let target: CurrencyConfig;
    if (typeof config === 'string') {
      const match = AVAILABLE_CURRENCIES.find(c => c.code === config || c.label === config || c.symbol === config);
      target = match ? { ...match } : { ...this.defaultCurrency };
    } else if (config.code) {
      const match = AVAILABLE_CURRENCIES.find(c => c.code === config.code);
      target = match ? { ...match, ...config } : { ...this.defaultCurrency, ...config };
    } else {
      target = { ...this.activeCurrency(), ...config };
    }

    this.activeCurrency.set(target);
    localStorage.setItem('easyedu_currency_config', JSON.stringify(target));
  }

  format(amount: number | null | undefined): string {
    if (amount === null || amount === undefined || isNaN(amount)) {
      amount = 0;
    }

    const curr = this.activeCurrency();
    const isNegative = amount < 0;
    const absVal = Math.abs(amount);

    let formattedNum = '';
    if (curr.numberSystem === 'indian') {
      formattedNum = absVal.toLocaleString('en-IN', {
        minimumFractionDigits: curr.decimals,
        maximumFractionDigits: curr.decimals
      });
    } else {
      formattedNum = absVal.toLocaleString('en-US', {
        minimumFractionDigits: curr.decimals,
        maximumFractionDigits: curr.decimals
      });
    }

    const res = curr.position === 'suffix'
      ? `${formattedNum} ${curr.symbol}`
      : `${curr.symbol} ${formattedNum}`;

    return isNegative ? `-${res}` : res;
  }
}
