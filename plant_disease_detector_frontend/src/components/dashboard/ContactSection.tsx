import React from 'react';
import { useTranslation } from 'react-i18next';
import { EnvelopeIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

const ContactSection = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Contact Me</h1>
        <p className="text-gray-600">Have a question or want to collaborate?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Developer Profile */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Developer</h2>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  AJ
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Ananya Jain</h3>
                  <p className="text-sm text-gray-600">Creator & Developer, PlantDoc</p>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                I built and maintain PlantDoc end-to-end — model, backend, and frontend.
                Feel free to reach out with feedback, bugs, or collaboration ideas.
              </p>

              <div className="flex space-x-2">
                <a
                  href="mailto:ananyajain2103@gmail.com"
                  className="flex-1 bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <EnvelopeIcon className="w-4 h-4" />
                  <span>Email</span>
                </a>
                <a
                  href="https://github.com/ananya-ctrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-1"
                >
                  <CodeBracketIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6">Have questions or feedback? I'd love to hear from you!</p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-800">ananyajain2103@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-3">About PlantDoc</h3>
            <p className="text-green-700 text-sm leading-relaxed">
              PlantDoc is an AI-powered plant disease detection system. It uses a CNN-based model
              to help farmers and gardeners identify plant diseases early and get effective
              treatment recommendations.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Project Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-600">Version:</span>
                <span className="text-blue-800 font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Technology:</span>
                <span className="text-blue-800 font-medium">React + AI + Django</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-600">Status:</span>
                <span className="text-blue-800 font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
