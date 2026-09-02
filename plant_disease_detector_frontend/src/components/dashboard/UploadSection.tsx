import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { usePlantData } from '../../contexts/PlantDataContext';
import { toast } from 'react-hot-toast';
import { CloudArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline';
import ResultCard from './ResultCard';
import ResultModal from './ResultModal';
import { useAppContext } from '../../contexts/AppContext';


const useAuth = () => {
  const token = localStorage.getItem('access_token');
  return { token };
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const UploadSection = () => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [analyzedImage, setAnalyzedImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { addImage, updateImageResult, selectedImage } = usePlantData();
  const { token } = useAuth();
  const { language } = useAppContext();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      toast.error('Please select valid image files');
      return;
    }

    if (imageFiles.length > 1) {
      toast.error('Please select only one image at a time for analysis');
      return;
    }

    const file = imageFiles[0];
    analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    if (!token) {
        toast.error("You must be logged in to analyze an image.");
        return;
    }

    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/plant_doctor_ai/analyze/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Language': `${language}`
        },
        body: formData,
      });

      if (!response.ok) {
        // Try to parse error from Django response for better feedback
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.error || `Analysis failed with status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const resultData = await response.json();
      
      // The backend response structure matches our frontend needs
      const result = {
        disease: resultData.disease,
        confidence: resultData.confidence,
        severity: resultData.severity,
        cure: resultData.cure,
        recoveryTime: resultData.recoveryTime,
        preventiveMeasures: resultData.preventiveMeasures,
      };

      // Now update the global state using your context
      const imageId = addImage(file);
      updateImageResult(imageId, result);
      
      // Prepare the data for the result modal, using the server-provided preview URL
      const imageForModal = { 
        id: imageId, 
        file: file,
        preview: resultData.preview, // Use the URL from the server
        uploadDate: new Date(), 
        result: result
      };
      
      setAnalyzedImage(imageForModal);
      setShowResultModal(true);
      
      toast.success('Analysis complete!');

    } catch (error: any) {
      // The 'any' type is used here to access error.message
      console.error("Analysis API Error:", error);
      toast.error(error.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><span className="mb-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[.16em] text-emerald-800">Plant health workspace</span><h1 className="text-3xl font-bold tracking-tight text-[#17392e] sm:text-4xl">{t('dashboard.upload.title')}</h1><p className="mt-2 max-w-2xl text-gray-600">{t('dashboard.upload.subtitle')}</p></div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm"><span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" /> AI model ready</div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.08fr_.92fr]">
        {/* Upload Area */}
        <div className="space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group relative min-h-[420px] cursor-pointer overflow-hidden rounded-[2rem] border-2 border-dashed p-8 text-center shadow-sm transition-all duration-300 sm:p-12 ${
              isDragging
                ? 'scale-[1.01] border-emerald-500 bg-emerald-50'
                : 'border-emerald-900/15 bg-white/70 hover:-translate-y-1 hover:border-emerald-500 hover:bg-white hover:shadow-xl'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex min-h-[320px] flex-col items-center justify-center space-y-5">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-100 to-green-200 shadow-inner transition duration-300 group-hover:scale-105 group-hover:rotate-2">
                <CloudArrowUpIcon className="h-10 w-10 text-emerald-700" />
              </div>
              
              <div>
                <h3 className="mb-2 text-xl font-bold text-[#17392e]">
                  {t('dashboard.upload.dropZone')}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t('dashboard.upload.browseText')}
                </p>
                <p className="text-sm text-gray-500">
                  {t('dashboard.upload.supportedFormats')}
                </p>
              </div>
              
              <button type="button" className="btn-animate rounded-xl bg-[#176b49] px-7 py-3 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-[#12583c]">
                {t('dashboard.upload.chooseFile')}
              </button>
            </div>
          </div>

          {isAnalyzing && (
            <div className="surface-card rounded-2xl p-6">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">{t('dashboard.upload.analyzing')}</h3>
                  <p className="text-sm text-gray-600">{t('dashboard.upload.analyzingSubtext')}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Area */}
        <div className="space-y-6">
          {selectedImage && selectedImage.result ? (
            <ResultCard image={selectedImage} />
          ) : (
            <div className="surface-card flex min-h-[420px] flex-col items-center justify-center rounded-[2rem] p-8 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#f2f6ef]"><PhotoIcon className="h-10 w-10 text-emerald-800/35" /></div>
              <h3 className="mb-2 text-lg font-semibold text-[#355246]">{t('dashboard.upload.noAnalysis')}</h3>
              <p className="text-gray-500">{t('dashboard.upload.noAnalysisSubtext')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Result Modal */}
      {analyzedImage && (
        <ResultModal
          image={analyzedImage}
          isOpen={showResultModal}
          onClose={() => {
            setShowResultModal(false);
            setAnalyzedImage(null);
          }}
        />
      )}
    </div>
  );
};

export default UploadSection;
