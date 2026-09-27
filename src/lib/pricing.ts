export type Region = 'IN' | 'INTL';
export type Plan = 'day' | 'lifetime';

export const PRICING = {
  IN: {
    symbol: '₹',
    currency: 'INR',
    day: 29,
    lifetime: 39,
    provider: 'phonepe',
    methods: 'UPI, cards & net banking',
    checkout: 'PhonePe',
    upsell: 'Just ₹10 more',
  },
  INTL: {
    symbol: '$',
    currency: 'USD',
    day: 2.99,
    lifetime: 5.99,
    provider: 'dodo',
    methods: 'Cards, Apple Pay & Google Pay',
    checkout: 'Dodo Payments',
    upsell: 'Just $3 more',
  },
} as const;

export const price = (region: Region, plan: Plan) => `${PRICING[region].symbol}${PRICING[region][plan]}`;