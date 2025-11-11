import { httpRequest } from './http';

/**
 * Interface for generated content item
 */
export interface GeneratedContent {
  id: number;
  title: string;
  content: string;
  topic: string;
  contentType: string;
  author?: string;
  language?: string;
  tone?: string;
  slug?: string;
  published: boolean;
  generatedAt: string;
  publishedAt?: string;
  metadata?: {
    length?: string;
    temperature?: number;
    prompt?: string;
    [key: string]: any;
  };
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Interface for generated content list response
 */
export interface GeneratedContentListResponse {
  success: boolean;
  data?: GeneratedContent[];
  total?: number;
  limit?: number;
  offset?: number;
  error?: string;
}

/**
 * Interface for generated content detail response
 */
export interface GeneratedContentDetailResponse {
  success: boolean;
  data?: GeneratedContent;
  error?: string;
}

/**
 * Fetch list of generated content
 * @param options Options for fetching generated content
 * @returns Promise with generated content list response
 */
export const fetchGeneratedContentList = async (options?: {
  published?: boolean;
  contentType?: string;
  limit?: number;
  offset?: number;
}): Promise<GeneratedContentListResponse> => {
  try {
    const { published = true, contentType, limit = 10, offset = 0 } = options || {};
    
    let url = `/deepseek/generated-content?published=${published}&limit=${limit}&offset=${offset}`;
    
    if (contentType) {
      url += `&contentType=${encodeURIComponent(contentType)}`;
    }
    
    return await httpRequest<GeneratedContentListResponse>(url);
  } catch (error) {
    console.error('Error fetching generated content list:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Fetch generated content by ID
 * @param id Generated content ID
 * @returns Promise with generated content detail response
 */
export const fetchGeneratedContentById = async (id: number): Promise<GeneratedContentDetailResponse> => {
  try {
    return await httpRequest<GeneratedContentDetailResponse>(`/deepseek/generated-content/${id}`);
  } catch (error) {
    console.error('Error fetching generated content by ID:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Fetch generated content by slug
 * @param slug Generated content slug
 * @returns Promise with generated content detail response
 */
export const fetchGeneratedContentBySlug = async (slug: string): Promise<GeneratedContentDetailResponse> => {
  try {
    return await httpRequest<GeneratedContentDetailResponse>(`/deepseek/generated-content/slug/${slug}`);
  } catch (error) {
    console.error('Error fetching generated content by slug:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Publish generated content
 * @param id Generated content ID
 * @returns Promise with generated content detail response
 */
export const publishGeneratedContent = async (id: number): Promise<GeneratedContentDetailResponse> => {
  try {
    return await httpRequest<GeneratedContentDetailResponse>(`/deepseek/generated-content/${id}/publish`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error publishing generated content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

/**
 * Unpublish generated content
 * @param id Generated content ID
 * @returns Promise with generated content detail response
 */
export const unpublishGeneratedContent = async (id: number): Promise<GeneratedContentDetailResponse> => {
  try {
    return await httpRequest<GeneratedContentDetailResponse>(`/deepseek/generated-content/${id}/unpublish`, {
      method: 'POST',
    });
  } catch (error) {
    console.error('Error unpublishing generated content:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
