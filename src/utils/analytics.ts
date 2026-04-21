declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Session-based lead journey tracking
let journey: string[] = [];
let startTime = typeof window !== 'undefined' ? Date.now() : 0;

export const addToJourney = (sectionId: string) => {
  if (typeof window === 'undefined') return;
  // Add section to journey if it's different from the last one
  if (journey[journey.length - 1] !== sectionId) {
    journey.push(sectionId);
    
    // Push to dataLayer for real-time reach analysis if needed
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'journey_step',
      step_name: sectionId
    });
  }
};

export const trackGAEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    
    const timeToConvert = Math.round((Date.now() - startTime) / 1000);
    const placement = `${window.location.pathname}${params?.element_id ? '#' + params.element_id : ''}`;

    window.dataLayer.push({
      event: eventName,
      event_time_iso: new Date().toISOString(),
      event_time_unix: Math.floor(Date.now() / 1000),
      placement: placement,
      journey_string: journey.join('|'),
      time_to_convert: timeToConvert,
      last_interaction: journey[journey.length - 1] || 'page_load',
      ...params
    });
  }
};
