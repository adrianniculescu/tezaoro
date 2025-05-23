
import React from 'react';
import PageLayout from '@/components/PageLayout';
import GuideContent from '@/components/GuideContent';
import { FileText, FileSpreadsheet, Shield, Settings, Mail } from 'lucide-react';

const ReportingFeatures = () => {
  return (
    <PageLayout title="Reporting Features">
      <GuideContent title="Reporting Features">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg mb-6">
            Tezaoro's reporting tools are designed to make it easy to track, share, and audit your algorithm's performance.
          </p>
          
          <h2 className="text-2xl font-bold mt-8 mb-6">Available Reports:</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Performance Summary</h3>
              </div>
              <p>
                A snapshot of key metrics, portfolio growth, and trade statistics for any selected period.
              </p>
            </div>
            
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Trade Log Export</h3>
              </div>
              <p>
                Download a detailed CSV or Excel file of all trades executed by your algorithm, including timestamps, prices, and outcomes.
              </p>
            </div>
            
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Risk & Compliance Report</h3>
              </div>
              <p>
                Automatically generated reports highlighting periods of high drawdown, excessive leverage, or deviation from set risk parameters.
              </p>
            </div>
            
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Custom Report Builder</h3>
              </div>
              <p>
                Create tailored reports by selecting specific metrics, timeframes, and visualizations.
              </p>
            </div>
            
            <div className="bg-card/50 p-6 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold">Scheduled Email Reports</h3>
              </div>
              <p>
                Receive daily, weekly, or monthly performance summaries directly to your inbox.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mt-8 mb-4">How to Access:</h2>
          
          <ol className="space-y-4 list-decimal ml-6 my-6">
            <li>Navigate to the "Reporting" tab in your dashboard.</li>
            <li>Choose your desired report type and time period.</li>
            <li>Download, print, or share reports securely with your team or stakeholders.</li>
          </ol>
        </div>
      </GuideContent>
    </PageLayout>
  );
};

export default ReportingFeatures;
