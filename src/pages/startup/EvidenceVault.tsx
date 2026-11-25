import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Eye, 
  Trash2, 
  ShieldCheck,
  Tag,
  Download,
  Copy,
  Hash
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';

export const EvidenceVault: React.FC = () => {
  const { documents, addDocument, deleteDocument } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  // Form state
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState<number>(2450);
  const [fileName, setFileName] = useState('');

  // Sample duplicate warning for matching C-02
  const showDuplicateWarning = true;

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument({
      fileName: fileName || `${merchant.replace(/\s+/g, '_')}_Invoice.pdf`,
      fileSize: '1.4 MB',
      fileType: 'pdf',
      category: 'Equipment',
      merchantName: merchant || 'Highland Sensor Solutions',
      transactionDate: '2026-10-28',
      amount: Number(amount),
      currency: 'USD',
      verificationStatus: 'VERIFIED',
      previewUrl: ''
    });
    setIsUploadModalOpen(false);
    setMerchant('');
    setFileName('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header matching C-01 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Evidence vault
          </h1>
          <p className="text-xs text-[#5A6275] mt-1">
            Tembo Agritech Ltd · Invoices, receipts, contract deliverables, and cryptographic proof hashes (SHA-256)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-[#0E6466] text-white hover:bg-[#0B4F51] shadow-ledger transition flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload receipt / invoice</span>
          </button>
        </div>
      </div>

      {/* Duplicate Check Warning Banner (matching C-02) */}
      <div className="p-4 bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-lg flex items-start gap-3 text-xs text-[#92400E]">
        <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-[#B45309]">Automated duplicate detection alert</div>
          <p>
            File <code className="px-1.5 py-0.5 bg-white/70 rounded font-mono text-[11px]">inv_highland_sensors_4100.pdf</code> has SHA-256 hash matching an invoice already tagged in Tranche 1 (<code className="font-mono text-[11px]">JE-0233</code>). Duplicate claims are blocked during committee review.
          </p>
        </div>
      </div>

      {/* Upload Drag & Drop Area */}
      <div 
        onClick={() => setIsUploadModalOpen(true)}
        className="p-8 border-2 border-dashed border-[#DDD8CC] hover:border-[#0E6466] rounded-lg bg-white transition cursor-pointer text-center group shadow-ledger"
      >
        <div className="w-12 h-12 rounded-full bg-[#F1EEE7] group-hover:bg-[#E8F3F1] text-[#5A6275] group-hover:text-[#0E6466] flex items-center justify-center mx-auto mb-3 transition">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-xs font-semibold text-[#16213A] mb-1">
          Click to upload or drag financial proof files here
        </p>
        <p className="text-[11px] text-[#5A6275]">
          PDF, PNG, JPG up to 25MB · SHA-256 content hashing runs in browser before server ingestion
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-lg border border-[#DDD8CC] shadow-ledger">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#5A6275] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vendor, file name, or amount..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#5A6275]">Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-[#FAF8F5] border border-[#DDD8CC] rounded-md text-[#16213A] focus:outline-none focus:border-[#0E6466]"
          >
            <option value="ALL">All categories</option>
            <option value="Equipment">Equipment</option>
            <option value="R&D Personnel">R&D Personnel</option>
            <option value="Contractors">Contractors</option>
            <option value="Cloud Infrastructure">Cloud Infrastructure</option>
          </select>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-white border border-[#DDD8CC] rounded-lg shadow-ledger overflow-hidden">
        <div className="px-5 py-3.5 bg-[#F1EEE7] border-b border-[#DDD8CC] flex items-center justify-between">
          <h2 className="text-xs font-semibold text-[#16213A] uppercase tracking-wider">
            Verified Files & Invoices
          </h2>
          <span className="text-xs text-[#5A6275]">{documents.length} files stored</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-2.5 px-4 text-left font-medium">File name</th>
                <th className="py-2.5 px-4 text-left font-medium">Vendor / Merchant</th>
                <th className="py-2.5 px-4 text-left font-medium">Category tag</th>
                <th className="py-2.5 px-4 text-right font-medium">Claim amount</th>
                <th className="py-2.5 px-4 text-left font-medium">OCR Status</th>
                <th className="py-2.5 px-4 text-left font-medium">SHA-256 Hash</th>
                <th className="py-2.5 px-right font-medium text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-mono">
              {documents.map((doc, idx) => (
                <tr key={doc.id} className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-sans">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0E6466] shrink-0" />
                      <span className="font-medium text-[#16213A]">{doc.fileName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-sans text-[#16213A]">{doc.merchantName}</td>
                  <td className="py-3 px-4 font-sans">
                    <span className="px-2 py-0.5 rounded bg-[#F1EEE7] border border-[#DDD8CC] text-[#16213A] text-[11px]">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-[#16213A]">
                    ${doc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4 font-sans">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#E8F3F1] text-[#0E6466] border border-[#0E6466]/20">
                      <CheckCircle2 className="w-3 h-3 text-[#0E6466]" />
                      OCR matched
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[10px] text-[#5A6275]">
                    <span title="SHA-256 Checksum" className="cursor-help">
                      7f8c4e{idx}...a2b9
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setSelectedDoc(doc)}
                        className="p-1 text-[#5A6275] hover:text-[#0E6466] transition"
                        title="View OCR Breakdown (C-03)"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="p-1 text-[#5A6275] hover:text-[#C0392B] transition"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* OCR Detail Modal (matching C-03) */}
      <Modal isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)} title="Document detail & OCR extraction">
        {selectedDoc && (
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-[#FAF8F5] border border-[#DDD8CC] rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5A6275]">File name:</span>
                <span className="font-mono font-medium text-[#16213A]">{selectedDoc.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6275]">Extracted merchant:</span>
                <span className="font-medium text-[#16213A]">{selectedDoc.merchantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6275]">OCR Total Amount:</span>
                <span className="font-mono font-medium text-[#0E6466]">${selectedDoc.amount.toLocaleString()} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6275]">Confidence score:</span>
                <span className="font-mono text-[#0E6466]">98.4% (Document AI)</span>
              </div>
            </div>

            <div className="text-[11px] text-[#5A6275]">
              Document hash has been recorded in audit block #48291. Changes to this file will invalidate attached journal vouchers.
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedDoc(null)}
                className="px-3.5 py-1.5 bg-[#16213A] text-white rounded-md text-xs"
              >
                Close viewer
              </button>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload receipt or invoice">
        <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium text-[#16213A] mb-1">Merchant / Vendor</label>
            <input 
              type="text" 
              required
              value={merchant} 
              onChange={e => setMerchant(e.target.value)} 
              placeholder="e.g. AWS EMEA SARL"
              className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
          <div>
            <label className="block font-medium text-[#16213A] mb-1">Invoice amount (USD)</label>
            <input 
              type="number" 
              required
              value={amount} 
              onChange={e => setAmount(Number(e.target.value))} 
              className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md font-mono text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
          <div>
            <label className="block font-medium text-[#16213A] mb-1">File name</label>
            <input 
              type="text" 
              value={fileName} 
              onChange={e => setFileName(e.target.value)} 
              placeholder="e.g. highland_soil_probes_oct26.pdf"
              className="w-full px-3 py-2 border border-[#DDD8CC] rounded-md text-xs text-[#16213A] focus:outline-none focus:border-[#0E6466]"
            />
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button 
              type="button" 
              onClick={() => setIsUploadModalOpen(false)} 
              className="px-3.5 py-1.5 border border-[#DDD8CC] rounded-md text-[#5A6275] hover:bg-[#F1EEE7]"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-3.5 py-1.5 bg-[#0E6466] text-white rounded-md hover:bg-[#0B4F51]"
            >
              Upload & Run OCR
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
