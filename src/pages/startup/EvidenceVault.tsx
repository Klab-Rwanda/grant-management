import React, { useState } from 'react';
import { 
  ChevronDown, 
  AlertTriangle, 
  Check, 
  Clock, 
  UploadCloud, 
  ArrowRight,
  ArrowLeft,
  Lock,
  Download,
  Search,
  Eye,
  Trash2,
  FileText
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export const EvidenceVault: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewMode = searchParams.get('view') || 'list'; // 'list' | 'upload' | 'detail'

  // Filter states for C-01
  const [search, setSearch] = useState('');
  const [linkedFilter, setLinkedFilter] = useState('All');
  const [ocrFilter, setOcrFilter] = useState('All');
  const [flagsFilter, setFlagsFilter] = useState('Any');

  // Exact data from C-01 screenshot:
  const documents = [
    {
      id: 'doc-1',
      name: 'INV-SP-0441.pdf',
      typeMeta: 'Invoice · 212 KB',
      vendorDate: 'Highland Instruments · 26 Oct',
      amount: '4,120.00',
      linkedTo: 'JE-0318 · T2',
      ocrStatus: 'Confirmed',
      fingerprint: 'a3f9..d1c2',
      flags: null,
      sharedLocked: false
    },
    {
      id: 'doc-2',
      name: 'receipt_drone_survey.jpg',
      typeMeta: 'Receipt · 1.8 MB',
      vendorDate: 'SkyMap Services · 14 Oct',
      amount: '2,180.00',
      linkedTo: 'JE-0301 · T2',
      ocrStatus: 'Confirmed',
      fingerprint: '9f2c..a71e',
      flags: 'Duplicate file',
      sharedLocked: false
    },
    {
      id: 'doc-3',
      name: 'wire_slip_oct_payroll.png',
      typeMeta: 'Bank slip · 640 KB',
      vendorDate: '—',
      amount: '—',
      linkedTo: 'Not linked',
      ocrStatus: 'Processing',
      fingerprint: '8b7d..0e18',
      flags: null,
      sharedLocked: false
    },
    {
      id: 'doc-4',
      name: 'IMG_2210.jpeg',
      typeMeta: 'Receipt · 3.1 MB',
      vendorDate: "Couldn't read",
      amount: '—',
      linkedTo: 'Not linked',
      ocrStatus: 'Needs manual entry',
      fingerprint: '77e1..c3a6',
      flags: null,
      sharedLocked: false
    },
    {
      id: 'doc-5',
      name: 'AWS-Oct-2026.pdf',
      typeMeta: 'Invoice · 98 KB',
      vendorDate: 'Cloud provider · 01 Nov',
      amount: '412.18',
      linkedTo: 'Not linked',
      ocrStatus: 'Review OCR',
      fingerprint: '5d02..bb19',
      flags: null,
      sharedLocked: false
    },
    {
      id: 'doc-6',
      name: 'weather-stations-inv.pdf',
      typeMeta: 'Invoice · 301 KB',
      vendorDate: 'AgriTech Supply · 12 Mar',
      amount: '8,400.00',
      linkedTo: 'JE-0094 · T1',
      ocrStatus: 'Confirmed',
      fingerprint: 'c81a..82fd',
      flags: null,
      sharedLocked: true
    }
  ];

  // Upload view state for C-02
  const [duplicateDecision, setDuplicateDecision] = useState<'dont_upload' | 'upload_anyway'>('dont_upload');

  // Detail view state for C-03
  const [merchant, setMerchant] = useState('Cloud provider, Inc.');
  const [transactionDate, setTransactionDate] = useState('2026-11-01');
  const [currency, setCurrency] = useState('USD');
  const [totalAmount, setTotalAmount] = useState('412.18');
  const [taxVat, setTaxVat] = useState('');

  // --------------------------------------------------------------------------
  // VIEW: C-02 Upload evidence
  // --------------------------------------------------------------------------
  if (viewMode === 'upload') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto font-sans pb-16">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Upload evidence
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            Invoices, receipts, bank wire slips and tax filings
          </p>
        </div>

        {/* Drag files here box */}
        <div className="p-8 border-2 border-dashed border-[#DDD8CC] rounded-xl bg-white text-center space-y-2">
          <UploadCloud className="w-8 h-8 text-[#5A6275] mx-auto" />
          <div className="font-semibold text-xs text-[#16213A]">
            Drag files here
          </div>
          <p className="text-[11px] text-[#5A6275]">
            PDF, PNG or JPEG · up to 25 MB each · up to 20 files at once
          </p>
          <div className="pt-1">
            <button className="px-4 py-2 text-xs font-medium rounded-lg border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] transition shadow-ledger">
              Choose files
            </button>
          </div>
        </div>

        {/* This upload (4 files) Card */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
          <h2 className="text-sm font-semibold text-[#16213A]">
            This upload (4 files)
          </h2>

          <div className="border border-[#DDD8CC] rounded-lg overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                  <th className="py-2.5 px-4 text-left font-medium">File</th>
                  <th className="py-2.5 px-4 text-left font-medium">Step</th>
                  <th className="py-2.5 px-4 text-left font-medium">Result</th>
                  <th className="py-2.5 px-4 text-right font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
                {/* Row 1: Ready */}
                <tr className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#16213A]">
                    INV-HI-0452.pdf · 204 KB
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-[11px] text-[#5A6275]">Stored · fingerprint e4b0..12aa</div>
                    <div className="w-48 h-1.5 bg-[#EAE6DD] rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-[#0E6466] w-full rounded-full"></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                      <Check className="w-3 h-3 text-[#0E6466]" /> Ready
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition">
                      Link to entry
                    </button>
                  </td>
                </tr>

                {/* Row 2: Processing */}
                <tr className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#16213A]">
                    receipt_fuel_nov.jpg · 2.2 MB
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-[11px] text-[#5A6275]">Calculating fingerprint on device... 64%</div>
                    <div className="w-48 h-1.5 bg-[#EAE6DD] rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-[#0E6466] w-[64%] rounded-full"></div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                      <Clock className="w-3 h-3 text-[#3B82F6]" /> Processing
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg text-[#5A6275] hover:text-[#16213A] text-xs font-medium transition">
                      Cancel
                    </button>
                  </td>
                </tr>

                {/* Row 3: Duplicate file */}
                <tr className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#16213A]">
                    receipt_drone_survey.jpg · 1.8 MB
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[#5A6275]">
                    Fingerprint matches a file already on the platform
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[11px] font-medium">
                      ⊗ Duplicate file
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] text-xs font-medium transition">
                      Review
                    </button>
                  </td>
                </tr>

                {/* Row 4: Rejected HEIC */}
                <tr className="hover:bg-[#FAF8F5]">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#16213A]">
                    contract_scan.heic · 4.0 MB
                  </td>
                  <td className="py-3 px-4 text-[11px] text-[#C0392B]">
                    ⊗ HEIC isn't supported. Export as JPEG or PDF.
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[11px] font-medium">
                      ⊗ Rejected
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="px-3 py-1.5 rounded-lg text-[#5A6275] hover:text-[#C0392B] text-xs font-medium transition">
                      Remove
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Possible duplicate modal/panel matching bottom of C-02 */}
        <div className="bg-white border border-[#DDD8CC] rounded-xl p-6 shadow-ledger space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#16213A]">
              Possible duplicate: receipt_drone_survey.jpg
            </h3>
            <span className="px-2 py-0.5 rounded bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[10px] font-mono font-medium uppercase">
              DUPLICATE_FILE_DETECTED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2 text-xs">
              <div className="font-semibold text-[#16213A]">Why we flagged it</div>
              <ul className="space-y-1 text-[#5A6275] list-disc list-inside leading-relaxed">
                <li>Identical SHA-256 fingerprint to a file uploaded on this platform before</li>
                <li>Same vendor, date and amount as your entry JE-0301 ($2,180.00, SkyMap Services, 14 Oct)</li>
              </ul>
              <p className="text-[11px] text-[#5A6275] pt-1">
                For privacy we never say which organisation or grant the other file belongs to.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="font-semibold text-[#16213A]">What would you like to do?</div>

              {/* Option 1 */}
              <label 
                className={`p-3 rounded-lg border block cursor-pointer transition ${
                  duplicateDecision === 'dont_upload'
                    ? 'border-[#0E6466] bg-[#E8F3F1]/30 ring-1 ring-[#0E6466]'
                    : 'border-[#DDD8CC]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="duplicate_choice"
                    checked={duplicateDecision === 'dont_upload'}
                    onChange={() => setDuplicateDecision('dont_upload')}
                    className="text-[#0E6466] focus:ring-0"
                  />
                  <span className="font-semibold text-[#16213A]">Don't upload</span>
                </div>
                <div className="text-[11px] text-[#5A6275] ml-5 mt-0.5">
                  Recommended if you've uploaded this receipt before
                </div>
              </label>

              {/* Option 2 */}
              <label 
                className={`p-3 rounded-lg border block cursor-pointer transition ${
                  duplicateDecision === 'upload_anyway'
                    ? 'border-[#0E6466] bg-[#E8F3F1]/30 ring-1 ring-[#0E6466]'
                    : 'border-[#DDD8CC]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="duplicate_choice"
                    checked={duplicateDecision === 'upload_anyway'}
                    onChange={() => setDuplicateDecision('upload_anyway')}
                    className="text-[#0E6466] focus:ring-0"
                  />
                  <span className="font-semibold text-[#16213A]">Upload anyway with an explanation</span>
                </div>
                <div className="text-[11px] text-[#5A6275] ml-5 mt-0.5">
                  The flag and your note stay visible to reviewers
                </div>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => navigate('/startup/evidence')}
                  className="px-4 py-2 rounded-lg border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => navigate('/startup/evidence')}
                  className="px-4 py-2 rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white transition font-medium shadow-ledger"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW: C-03 Document detail & OCR
  // --------------------------------------------------------------------------
  if (viewMode === 'detail') {
    return (
      <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
        {/* Header matching C-03 */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
              AWS-Oct-2026.pdf
            </h1>
            <p className="text-xs text-[#5A6275] mt-1 font-sans">
              Invoice · 98 KB · Uploaded 02 Nov 2026 by Amani N.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#DDD8CC] text-[#16213A] hover:bg-[#F1EEE7] shadow-ledger transition">
              Download
            </button>
            <button 
              onClick={() => navigate('/startup/evidence')}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition"
            >
              Confirm & link to entry
            </button>
          </div>
        </div>

        {/* 2-Column Split: Document Viewer (Left) + Extracted fields & Integrity (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left Column: Simulated PDF Invoice Canvas */}
          <div className="space-y-3">
            <div className="bg-white border border-[#DDD8CC] rounded-xl p-8 shadow-ledger min-h-[480px] space-y-6">
              <div className="flex justify-between items-start">
                <span className="px-3 py-1 rounded bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-xs font-semibold">
                  Cloud provider, Inc.
                </span>
                <span className="text-xs text-[#5A6275] font-mono uppercase">
                  INVOICE
                </span>
              </div>

              <div className="w-24 h-2 bg-[#EAE6DD] rounded"></div>

              <div className="space-y-2 pt-4 text-xs font-mono">
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1">
                  <span className="text-[#5A6275]">Invoice date</span>
                  <span className="text-[#16213A] border border-[#DDD8CC] px-2 py-0.5 rounded">2026-11-01</span>
                </div>
                <div className="flex justify-between border-b border-[#DDD8CC]/50 pb-1">
                  <span className="text-[#5A6275]">Billing period</span>
                  <span className="text-[#16213A]">Oct 2026</span>
                </div>
              </div>

              <div className="w-full h-2 bg-[#EAE6DD] rounded"></div>
              <div className="w-2/3 h-2 bg-[#EAE6DD] rounded"></div>

              <div className="space-y-2 pt-6 text-xs font-mono">
                <div className="flex justify-between text-[#5A6275]">
                  <span>Compute</span>
                  <span>301.44</span>
                </div>
                <div className="flex justify-between text-[#5A6275]">
                  <span>Storage</span>
                  <span>88.12</span>
                </div>
                <div className="flex justify-between text-[#5A6275]">
                  <span>Data transfer</span>
                  <span>22.62</span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#16213A] pt-2 border-t border-[#16213A]">
                  <span>Total (USD)</span>
                  <span className="border border-[#0E6466] px-2 py-0.5 rounded text-[#0E6466]">412.18</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#5A6275]">
              <button className="px-3 py-1 border border-[#DDD8CC] rounded-lg bg-white">
                Previous page
              </button>
              <span>Page 1 of 1</span>
              <button className="px-3 py-1 border border-[#DDD8CC] rounded-lg bg-white">
                Next page
              </button>
            </div>
          </div>

          {/* Right Column: Extracted fields, Integrity, Access history */}
          <div className="space-y-6">
            {/* Extracted fields Card */}
            <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-[#16213A]">
                  Extracted fields
                </h2>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#1D4ED8] bg-[#EFF6FF] px-2 py-0.5 rounded-full border border-[#3B82F6]/30">
                  <Clock className="w-3 h-3 text-[#3B82F6]" /> Review OCR
                </span>
              </div>

              <div className="space-y-3 text-xs">
                {/* Merchant */}
                <div>
                  <label className="block text-[#16213A] font-medium mb-1">Merchant</label>
                  <input
                    type="text"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 text-xs text-[#16213A]"
                  />
                  <div className="text-[10px] text-[#5A6275] mt-0.5">Confidence: high</div>
                </div>

                {/* Transaction date & Currency */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#16213A] font-medium mb-1">Transaction date</label>
                    <input
                      type="date"
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CC] rounded-lg px-2.5 py-2 font-mono text-xs text-[#16213A]"
                    />
                    <div className="text-[10px] text-[#5A6275] mt-0.5">Confidence: high</div>
                  </div>

                  <div>
                    <label className="block text-[#16213A] font-medium mb-1">Currency</label>
                    <input
                      type="text"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 font-mono text-xs text-[#16213A]"
                    />
                    <div className="text-[10px] text-[#5A6275] mt-0.5">Confidence: high</div>
                  </div>
                </div>

                {/* Total amount */}
                <div>
                  <label className="block text-[#16213A] font-medium mb-1">Total amount</label>
                  <input
                    type="text"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3 py-2 font-mono text-xs text-right text-[#16213A]"
                  />
                  <div className="text-[10px] text-[#5A6275] mt-0.5">Confidence: high</div>
                </div>

                {/* Tax / VAT (Red highlighted field from C-03) */}
                <div>
                  <label className="block text-[#16213A] font-medium mb-1">Tax / VAT</label>
                  <input
                    type="text"
                    value={taxVat}
                    onChange={(e) => setTaxVat(e.target.value)}
                    placeholder=""
                    className="w-full bg-white border-2 border-[#C0392B] rounded-lg px-3 py-2 font-mono text-xs text-[#16213A] focus:outline-none"
                  />
                  <div className="text-[11px] text-[#C0392B] mt-1 flex items-center gap-1">
                    ⊗ Low confidence. Check the document and enter it, or mark it "none".
                  </div>
                </div>

                <div className="pt-1">
                  <button className="text-xs text-[#0E6466] hover:underline font-medium">
                    Line items (3)
                  </button>
                </div>
              </div>
            </div>

            {/* Integrity Card matching C-03 */}
            <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3">
              <h2 className="text-sm font-semibold text-[#16213A]">
                Integrity
              </h2>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[#5A6275]">SHA-256</span>
                  <span className="font-mono text-[10px] text-[#16213A] text-right break-all max-w-xs">
                    5d02c9e7a1f04b88d3e6a2c1f907763140bd61f2c03e9a0d14c7b5e2a913ab19
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5A6275]">Duplicate check</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                    <Check className="w-3 h-3 text-[#0E6466]" /> No match
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[#5A6275]">Visibility</span>
                  <span className="text-[#16213A]">Private to Tembo until submitted</span>
                </div>
              </div>
            </div>

            {/* Access history Card matching C-03 */}
            <div className="bg-white border border-[#DDD8CC] rounded-xl p-5 shadow-ledger space-y-3">
              <h2 className="text-sm font-semibold text-[#16213A]">
                Access history
              </h2>

              <div className="space-y-1.5 text-xs text-[#5A6275] font-mono text-[11px]">
                <div>02 Nov 10:21 · Uploaded · Amani N.</div>
                <div>02 Nov 10:22 · OCR completed · system</div>
                <div>05 Nov 09:03 · Viewed · Grace M.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // VIEW: C-01 Evidence vault (Default List View)
  // --------------------------------------------------------------------------
  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-16">
      {/* Top Header matching C-01 */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-normal text-[#16213A] tracking-tight">
            Evidence vault
          </h1>
          <p className="text-xs text-[#5A6275] mt-1 font-sans">
            214 documents · Encrypted at rest · Only shared with a funder when attached to a submitted line item
          </p>
        </div>

        <Link
          to="/startup/evidence?view=upload"
          className="px-4 py-2 text-xs font-medium rounded-lg bg-[#0E6466] hover:bg-[#0B4F51] text-white shadow-ledger transition self-start sm:self-auto"
        >
          Upload documents
        </Link>
      </div>

      {/* 4 Filters Row matching C-01 */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Search
          </label>
          <input
            type="text"
            placeholder="Vendor, amount, file name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 text-xs text-[#16213A] placeholder-[#5A6275]/70 shadow-ledger focus:outline-none focus:border-[#0E6466]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Linked
          </label>
          <div className="relative">
            <select
              value={linkedFilter}
              onChange={(e) => setLinkedFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Linked">Linked</option>
              <option value="Not linked">Not linked</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            OCR status
          </label>
          <div className="relative">
            <select
              value={ocrFilter}
              onChange={(e) => setOcrFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Needs manual entry">Needs manual entry</option>
              <option value="Review OCR">Review OCR</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#16213A] mb-1.5">
            Flags
          </label>
          <div className="relative">
            <select
              value={flagsFilter}
              onChange={(e) => setFlagsFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#DDD8CC] rounded-lg px-3.5 py-2 pr-8 text-xs font-medium text-[#16213A] shadow-ledger focus:outline-none focus:border-[#0E6466] cursor-pointer"
            >
              <option value="Any">Any</option>
              <option value="Duplicate file">Duplicate file</option>
              <option value="Shared · locked">Shared · locked</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A6275] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Documents Table matching C-01 */}
      <div className="bg-white border border-[#DDD8CC] rounded-xl shadow-ledger overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-[#DDD8CC] bg-[#FAF8F5] text-[#5A6275]">
                <th className="py-3 px-4 text-left font-medium">Document</th>
                <th className="py-3 px-4 text-left font-medium">Vendor · date (OCR)</th>
                <th className="py-3 px-4 text-right font-medium">Amount</th>
                <th className="py-3 px-4 text-left font-medium">Linked to</th>
                <th className="py-3 px-4 text-left font-medium">OCR</th>
                <th className="py-3 px-4 text-left font-medium">Fingerprint</th>
                <th className="py-3 px-4 text-left font-medium">Flags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CC]/60 font-sans">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#FAF8F5] transition">
                  {/* Document Name */}
                  <td className="py-3.5 px-4">
                    <Link
                      to={`/startup/evidence?view=detail`}
                      className="font-medium text-[#16213A] hover:underline"
                    >
                      {doc.name}
                    </Link>
                    <div className="text-[11px] text-[#5A6275] mt-0.5">{doc.typeMeta}</div>
                  </td>

                  {/* Vendor · date (OCR) */}
                  <td className="py-3.5 px-4 text-[#16213A]">
                    {doc.vendorDate}
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4 text-right font-mono text-[#16213A]">
                    {doc.amount}
                  </td>

                  {/* Linked to */}
                  <td className="py-3.5 px-4">
                    {doc.linkedTo !== 'Not linked' ? (
                      <span className="px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DDD8CC] text-[#16213A] font-mono text-[11px]">
                        {doc.linkedTo}
                      </span>
                    ) : (
                      <span className="text-[#5A6275]">{doc.linkedTo}</span>
                    )}
                  </td>

                  {/* OCR Status */}
                  <td className="py-3.5 px-4">
                    {doc.ocrStatus === 'Confirmed' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F3F1] border border-[#0E6466]/20 text-[#0E6466] text-[11px] font-medium">
                        <Check className="w-3 h-3 text-[#0E6466]" /> Confirmed
                      </span>
                    )}
                    {doc.ocrStatus === 'Processing' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium">
                        <Clock className="w-3 h-3 text-[#3B82F6]" /> Processing
                      </span>
                    )}
                    {doc.ocrStatus === 'Needs manual entry' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/30 text-[#92400E] text-[11px] font-medium">
                        <AlertTriangle className="w-3 h-3 text-[#D97706]" /> Needs manual entry
                      </span>
                    )}
                    {doc.ocrStatus === 'Review OCR' && (
                      <Link
                        to="/startup/evidence?view=detail"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFF6FF] border border-[#3B82F6]/30 text-[#1D4ED8] text-[11px] font-medium hover:underline"
                      >
                        <Clock className="w-3 h-3 text-[#3B82F6]" /> Review OCR
                      </Link>
                    )}
                  </td>

                  {/* Fingerprint */}
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#5A6275]">
                    {doc.fingerprint}
                  </td>

                  {/* Flags */}
                  <td className="py-3.5 px-4">
                    {doc.flags === 'Duplicate file' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FDF2F2] border border-[#C0392B]/20 text-[#C0392B] text-[11px] font-medium">
                        ⊗ Duplicate file
                      </span>
                    )}
                    {doc.sharedLocked && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#DDD8CC] text-[#5A6275] text-[11px] font-medium">
                        <Lock className="w-3 h-3 text-[#5A6275]" /> Shared · locked
                      </span>
                    )}
                    {!doc.flags && !doc.sharedLocked && (
                      <span className="text-[#5A6275]">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="px-5 py-3 bg-[#FAF8F5] border-t border-[#DDD8CC] flex items-center justify-between text-xs text-[#5A6275]">
          <span>Rows 1–6 of 214</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 rounded border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] transition">
              Previous
            </button>
            <button className="px-3 py-1 rounded border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] transition">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Duplicate file detected warning banner matching bottom of C-01 */}
      <div className="p-4 bg-[#FDF2F2] border border-[#C0392B]/20 rounded-xl flex items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-2.5">
          <span className="text-[#C0392B] font-bold text-sm leading-none mt-0.5">⊗</span>
          <div>
            <div className="font-semibold text-[#C0392B]">
              Duplicate file detected · receipt_drone_survey.jpg
            </div>
            <div className="text-[#5A6275] mt-0.5">
              This exact file (same SHA-256 fingerprint) is already on the platform. We don't show where. If you attach it, reviewers will see the flag.
            </div>
          </div>
        </div>

        <Link
          to="/startup/evidence?view=upload"
          className="px-3 py-1.5 rounded-lg border border-[#DDD8CC] bg-white text-[#16213A] hover:bg-[#F1EEE7] transition font-medium shrink-0"
        >
          Review
        </Link>
      </div>

      <p className="text-[11px] text-[#5A6275]">
        Phase 1 shows documents and manual linking only. OCR columns and the duplicate flag arrive in Phase 2 and are hidden until then.
      </p>
    </div>
  );
};
