import React from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import {
  ChartBarIcon, 
  UsersIcon, 
  CurrencyYenIcon, 
  CodeBracketIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { Project } from '../types/project';

interface ProjectDetailsPopupProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsPopup({ project, isOpen, onClose }: ProjectDetailsPopupProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 flex items-center justify-center">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500/80" aria-hidden="true" />
        
        <Dialog.Panel className="relative mx-auto w-full max-w-2xl bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                {project.title}
              </Dialog.Title>
              <p className="text-gray-500 mt-1">{project.description}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">進捗状況</span>
              <span className="text-sm font-medium text-primary">{project.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-lg overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <MetricCard
              icon={<UsersIcon className="w-5 h-5" />}
              label="参加者数"
              value={project.participants.count}
              change={project.participants.growth}
            />
            <MetricCard
              icon={<CurrencyYenIcon className="w-5 h-5" />}
              label="サポート額"
              value={project.support.amount}
              change={project.support.growth}
              format="currency"
            />
            <MetricCard
              icon={<CodeBracketIcon className="w-5 h-5" />}
              label="アクティビティ"
              value={project.activities.count}
              change={project.activities.growth}
            />
            <MetricCard
              icon={<ChartBarIcon className="w-5 h-5" />}
              label="インパクト"
              value={project.impact.users}
              change={project.impact.communityGrowth}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">使用技術</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 rounded-lg text-sm text-gray-600"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mt-4"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHubで見る
              <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
            </a>
          )}

          <button className="w-full px-4 py-3 bg-primary text-accent rounded-lg font-medium hover:bg-primary/90 transition-colors mt-4">
            プロジェクトに参加する
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  change: number;
  format?: 'number' | 'currency';
}

function MetricCard({ icon, label, value, change, format = 'number' }: MetricCardProps) {
  const formattedValue = format === 'currency' 
    ? new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(value)
    : value.toLocaleString();

  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex items-center text-gray-600 mb-2">
        {icon}
        <span className="text-xs ml-1">{label}</span>
      </div>
      <div className="font-bold text-lg text-gray-900">{formattedValue}</div>
      <div className={`text-xs ${change >= 0 ? 'text-primary' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </div>
    </div>
  );
}
