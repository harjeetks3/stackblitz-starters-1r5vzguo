import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher, api } from '../../lib/api';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import Badge from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import TranslationButton from '../../components/Translation/TranslationButton';
import { useToast } from '../../hooks/useToast';
import { useAuth } from '../../contexts/AuthContext';
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  Play,
  Download,
  Clock,
  AlertCircle,
  Languages,
  ShieldCheck,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import AIAssistant from '../../components/AIAssistant/AIAssistant';

export default function TenderDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { addToast } = useToast();
  const { user } = useAuth();
  
  const [aiSummary, setAiSummary] = useState(null);
  const [eligibilityCheck, setEligibilityCheck] = useState(null);
  const [detailedEligibility, setDetailedEligibility] = useState(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isCheckingEligibility, setIsCheckingEligibility] = useState(false);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);

  // Fetch tender details from the API
  const { data: tender, error, isLoading } = useSWR(
    id ? `/api/tenders/${id}` : null,
    fetcher
  );

  // Fetch company profile for eligibility context
  const { data: companyProfile } = useSWR(
    user ? '/api/company' : null,
    fetcher
  );

  // Fetch eligibility summary when tender and company profile are loaded
  useEffect(() => {
    const fetchEligibilitySummary = async () => {
      if (!id || !user || !companyProfile) return;
      
      try {
        const result = await api('/api/eligibilitySummary', {
          method: 'POST',
          body: { tenderIds: [id] }
        });
        
        if (result && result[id]) {
          setDetailedEligibility(result[id]);
        }
      } catch (error) {
        console.error('Error fetching eligibility summary:', error);
      }
    };

    fetchEligibilitySummary();
  }, [id, user, companyProfile]);

  // AI functions
  const generateAISummary = async () => {
    try {
      setIsGeneratingSummary(true);
      const result = await api('/api/summarize', {
        method: 'POST',
        body: { tenderId: id }
      });
      setAiSummary(result.summary);
      addToast('Summary generated successfully!', 'success');
    } catch (error) {
      addToast('Failed to generate summary', 'error');
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const checkEligibility = async () => {
    try {
      setIsCheckingEligibility(true);
      const result = await api('/api/checkEligibility', {
        method: 'POST',
        body: { tenderId: id }
      });
      setEligibilityCheck(result.eligibility);
      addToast('Eligibility check completed!', 'success');
    } catch (error) {
      addToast('Failed to check eligibility', 'error');
    } finally {
      setIsCheckingEligibility(false);
    }
  };

  const generateProposal = async () => {
    try {
      setIsGeneratingProposal(true);
      const result = await api('/api/generateProposal', {
        method: 'POST',
        body: { tenderId: id }
      });
      addToast('Proposal draft created!', 'success');
      router.push(`/proposals/edit/${result.proposalId}`);
    } catch (error) {
      addToast('Failed to generate proposal', 'error');
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  const getDaysUntilClosing = (closingDate) => {
    return formatDistanceToNow(new Date(closingDate), { addSuffix: true });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">New</Badge>;
      case 'closing-soon':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Closing Soon</Badge>;
      default:
        return <Badge variant="secondary">Active</Badge>;
    }
  };

  // Get eligibility badge styling
  const getEligibilityBadge = () => {
    if (!detailedEligibility) return null;
    
    const { status, score } = detailedEligibility;
    
    switch (status) {
      case 'high_match':
        return (
          <Badge className="bg-green-100 text-green-800 flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span>{score}% Match</span>
          </Badge>
        );
      case 'medium_match':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 mr-1" />
            <span>{score}% Match</span>
          </Badge>
        );
      case 'low_match':
        return (
          <Badge className="bg-orange-100 text-orange-800 flex items-center space-x-1">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span>{score}% Match</span>
          </Badge>
        );
      case 'incomplete_profile':
        return (
          <Badge className="bg-blue-100 text-blue-800 flex items-center space-x-1">
            <ShieldCheck className="w-4 h-4 mr-1" />
            <span>Complete Profile</span>
          </Badge>
        );
      default:
        return null;
    }
  };

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-red-600">Failed to load tender details. Please try again.</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading || !tender) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="skeleton h-8 w-3/4"></div>
          <div className="skeleton h-4 w-1/2"></div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      </div>
    );
  }

  // Calculate days until closing date
  const daysUntilClosing = Math.ceil(
    (new Date(tender.closingDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  // Determine if tender is closing soon (within 7 days)
  const isClosingSoon = daysUntilClosing <= 7 && daysUntilClosing > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/tenders" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tenders</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                    {tender.title}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Building className="w-4 h-4" />
                      <span>{tender.agency}</span>
                    </div>
                    {tender.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{tender.location}</span>
                      </div>
                    )}
                    {tender.tenderId && (
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{tender.tenderId}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tender.category && <Badge variant="outline">{tender.category}</Badge>}
                    
                    
                    {tender.isNew && <Badge variant="outline">Featured</Badge>}
                    
                    
                    {tender.tags && tender.tags.map(tag => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                    {getEligibilityBadge()}
                  </div>
                </div>
                {getStatusBadge(isClosingSoon ? 'closing-soon' : (tender.isNew ? 'new' : 'active'))}
              </div>
            </CardHeader>
          </Card>

          {/* Eligibility Details */}
          {detailedEligibility && user && (
            <Card className={`border-l-4 ${
              detailedEligibility.status === 'high_match' ? 'border-l-green-500 bg-green-50/30' :
              detailedEligibility.status === 'medium_match' ? 'border-l-yellow-500 bg-yellow-50/30' :
              detailedEligibility.status === 'low_match' ? 'border-l-orange-500 bg-orange-50/30' :
              'border-l-blue-500 bg-blue-50/30'
            }`}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Eligibility Assessment</span>
                  <span className="ml-auto text-lg font-bold">
                    {detailedEligibility.score}%
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{detailedEligibility.message}</p>
                
                {detailedEligibility.matchedCriteria && detailedEligibility.matchedCriteria.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Matched Criteria</h4>
                    <ul className="space-y-2">
                      {detailedEligibility.matchedCriteria.map((criterion, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {detailedEligibility.missingCriteria && detailedEligibility.missingCriteria.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Missing or Incomplete</h4>
                    <ul className="space-y-2">
                      {detailedEligibility.missingCriteria.map((criterion, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {detailedEligibility.status === 'incomplete_profile' && (
                  <div className="mt-4">
                    <Link href="/company-profile">
                      <Button>Complete Your Profile</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* AI Tools Panel */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-900">
                <Sparkles className="w-5 h-5" />
                <span>AI-Powered Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={generateAISummary}
                  disabled={isGeneratingSummary}
                  className="flex flex-col items-center space-y-2 h-auto py-4 bg-blue-600 hover:bg-blue-700"
                >
                  <FileText className="w-6 h-6" />
                  <span>{isGeneratingSummary ? 'Generating...' : 'AI Summary'}</span>
                </Button>
                
                <Button
                  onClick={checkEligibility}
                  disabled={isCheckingEligibility}
                  variant="outline"
                  className="flex flex-col items-center space-y-2 h-auto py-4 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <CheckCircle className="w-6 h-6" />
                  <span>{isCheckingEligibility ? 'Checking...' : 'Check Eligibility'}</span>
                </Button>
                
                <Button
                  onClick={generateProposal}
                  disabled={isGeneratingProposal}
                  variant="outline"
                  className="flex flex-col items-center space-y-2 h-auto py-4 border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>{isGeneratingProposal ? 'Generating...' : 'Generate Proposal'}</span>
                </Button>
              </div>

              {/* AI Summary Result */}
              {aiSummary && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-900 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4" />
                      <span>AI Summary</span>
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Play className="w-4 h-4" />
                      </Button>
                      <TranslationButton
                        text={aiSummary}
                        targetLang="ms"
                        buttonText="Translate to Malay"
                        size="sm"
                      />
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{aiSummary}</p>
                </div>
              )}

              {/* Eligibility Check Result */}
              {eligibilityCheck && (
                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Eligibility Assessment</span>
                  </h4>
                  <div className="space-y-2">
                    {eligibilityCheck.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 text-sm">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${
                          item.eligible ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {item.eligible ? (
                            <CheckCircle className="w-3 h-3 text-green-600" />
                          ) : (
                            <AlertCircle className="w-3 h-3 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.requirement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Assistant Component */}
          <AIAssistant tenderId={id} />

          {/* Tender Details Tabs */}
          <Card>
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="p-6">
                <div className="prose max-w-none">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Project Description</h3>
                    <TranslationButton
                      text={tender.description}
                      targetLang="en"
                      buttonText="Translate to English"
                      variant="outline"
                    />
                  </div>
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {tender.description}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="requirements" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Requirements & Qualifications</h3>
                {tender.requirements && tender.requirements.length > 0 ? (
                  <ul className="space-y-3">
                    {tender.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-700">
                    <p>Specific requirements will be detailed in the tender documentation.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="documents" className="p-6">
                <h3 className="text-lg font-semibold mb-4">Tender Documents</h3>
                {tender.documents && tender.documents.length > 0 ? (
                  <div className="space-y-3">
                    {tender.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              {doc.type || 'Document'} • {doc.size ? `${Math.round(doc.size / 1024)} KB` : 'Unknown size'}
                            </p>
                          </div>
                        </div>
                        {doc.signedUrl ? (
                          <a 
                            href={doc.signedUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-secondary text-sm"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </a>
                        ) : (
                          <Button variant="outline" size="sm" disabled>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No documents available for this tender.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Information */}
          <Card>
            <CardHeader>
              <CardTitle>Key Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tender.budget && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Budget</label>
                  <p className="text-xl font-bold text-gray-900">{tender.budget}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Closing Date</label>
                <p className="font-semibold text-gray-900">{new Date(tender.closingDate).toLocaleDateString()}</p>
                <p className="text-sm text-red-600 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{getDaysUntilClosing(tender.closingDate)}</span>
                </p>
              </div>
              {tender.publishedDate && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Published</label>
                  <p className="text-gray-900">{new Date(tender.publishedDate).toLocaleDateString()}</p>
                </div>
              )}
              {tender.category && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <p className="text-gray-900">{tender.category}</p>
                </div>
              )}
              {tender.location && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <p className="text-gray-900">{tender.location}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Translation Tools */}
          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-900">
                <Languages className="w-5 h-5" />
                <span>Translation Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-purple-700 mb-4">
                Translate tender content between English and Bahasa Malaysia
              </p>
              
              <TranslationButton
                text={tender.title}
                targetLang="en"
                buttonText="Translate Title to English"
                variant="outline"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              />
              
              <TranslationButton
                text={tender.description}
                targetLang="en"
                buttonText="Translate Description to English"
                variant="outline"
                className="w-full border-purple-300 text-purple-700 hover:bg-purple-50"
              />
              
              <div className="pt-2 border-t border-purple-200">
                <p className="text-xs text-purple-600">
                  <strong>Tip:</strong> Official submissions must be in Bahasa Malaysia. 
                  Use translation when preparing your proposal.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={generateProposal}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={isGeneratingProposal}
              >
                {isGeneratingProposal ? 'Generating...' : 'Start Proposal'}
              </Button>
              <Button variant="outline" className="w-full">
                Save for Later
              </Button>
              <Button variant="outline" className="w-full">
                Share Tender
              </Button>
            </CardContent>
          </Card>

          {/* Documents */}
          {tender.documents && tender.documents.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tender.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-900 line-clamp-1">{doc.name}</span>
                    </div>
                    {doc.signedUrl ? (
                      <a 
                        href={doc.signedUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-1 h-auto"
                        onClick={async () => {
                          try {
                            const result = await api(`/api/files/signed-url?filePath=${encodeURIComponent(doc.path)}`);
                            window.open(result.signedUrl, '_blank');
                          } catch (error) {
                            addToast('Failed to generate download link', 'error');
                          }
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Voice Summary */}
          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-900">
                <Play className="w-5 h-5" />
                <span>Voice Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-purple-700 mb-4">
                Listen to an AI-generated audio summary of this tender
              </p>
              <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                <Play className="w-4 h-4 mr-2" />
                Play Summary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}