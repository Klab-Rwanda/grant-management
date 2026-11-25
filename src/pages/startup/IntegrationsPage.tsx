import React, { useState } from 'react';
import { 
  Plug, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  Database,
  Cloud,
  Layers,
  Banknote
} from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState([
    {
      id: 'quickbooks',
      name: 'QuickBooks Online',
      category: 'Accounting Sync',
      icon: Database,
      status: 'CONNECTED',
      description: 'Two-way sync of Chart of Accounts, vendor invoices, and journal vouchers.',
      lastSync: '10 minutes ago'
    },
    {
      id: 'stripe',
      name: 'Stripe Billing & Connect',
      category: 'Revenue Feeds',
      icon: Banknote,
      status: 'CONNECTED',
      description: 'Automatic daily journal entries for SaaS subscription payouts and merchant fees.',
      lastSync: 'Today, 04:00 AM'
    },
    {
      id: 'google_drive',
      name: 'Google Drive & Document AI',
      category: 'Evidence Vault',
      icon: Cloud,
      status: 'CONNECTED',
      description: 'Continuous OCR extraction, duplicate hash computation, and receipt indexing.',
      lastSync: 'Real-time'
    },
    {
      id: 'xero',
      name: 'Xero Accounting',
      category: 'Accounting Sync',
      icon: Database,
      status: 'AVAILABLE',
      description: 'Import bank statements and historical transactions directly into Grant Ledger.',
      lastSync: 'Never'
    }
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching X-05 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Connected integrations
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · External bank feeds, accounting software sync, and Document AI OCR services
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#5A6275]" />
            <span>Test all connections</span>
          </button>
        </div>
      </div>

      {/* Grid of Integrations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {integrations.map((item) => {
          const Icon = item.icon;
          const isConnected = item.status === 'CONNECTED';

          return (
            <div 
              key={item.id} 
              className="bg-white border border-[#DDD8CC] rounded-lg p-5 shadow-ledger flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F1EEE7] border border-[#DDD8CC] flex items-center justify-center text-[#16213A]">
                      <Icon className="w-5 h-5 text-[#0E6466]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs text-[#16213A]">{item.name}</h3>
                      <span className="text-[11px] text-[#5A6275]">{item.category}</span>
                    </div>
                  </div>

                  {isConnected ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#0E6466] font-medium bg-[#E8F3F1] px-2 py-0.5 rounded border border-[#0E6466]/20">
                      <Check className="w-3 h-3" /> Connected
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#5A6275] bg-[#F1EEE7] px-2 py-0.5 rounded border border-[#DDD8CC]">
                      Available
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5A6275] mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DDD8CC]/60 flex items-center justify-between text-[11px]">
                <span className="text-[#5A6275]">
                  {isConnected ? `Last synced: ${item.lastSync}` : 'Not connected'}
                </span>

                {isConnected ? (
                  <button className="text-[#C0392B] hover:underline font-medium">
                    Disconnect
                  </button>
                ) : (
                  <button className="px-3 py-1 bg-[#0E6466] text-white rounded font-medium hover:bg-[#0B4F51] transition">
                    Connect →
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
