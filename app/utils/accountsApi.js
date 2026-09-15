/**
 * Shopkite Accounts API Client
 * Integrated according to Shopkite-Accounts.html API documentation.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_ACCOUNTS_API_URL || 'https://accounts.shopkite.com.ng/api';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

/**
 * Handle API responses consistently
 */
async function parseResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error(
      `Unexpected server response (${response.status} ${response.statusText}). Please check your connection.`
    );
  }

  if (!response.ok) {
    // Check for Laravel/Shopkite error structure
    let errorMessage = data.message || `Request failed with status ${response.status}`;
    if (data.errors && typeof data.errors === 'object') {
      const firstError = Object.values(data.errors).flat()[0];
      if (firstError) {
        errorMessage = firstError;
      }
    }
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Check whether an email exists in the Shopkite Accounts system.
 * Endpoint: POST /api/auth/check-email
 *
 * @param {string} email
 * @returns {Promise<{ success: boolean, exists: boolean, message: string, data?: object }>}
 */
export async function checkEmail(email) {
  const response = await fetch(`${API_BASE_URL}/auth/check-email`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ email: email.trim() }),
  });
  return parseResponse(response);
}

/**
 * Authenticate an existing account using email or mobile phone with a password.
 * Endpoint: POST /api/auth/login
 *
 * @param {Object} credentials
 * @param {string} credentials.login - Email or phone number
 * @param {string} credentials.password - Account password
 * @returns {Promise<{ success: boolean, message: string, token: string, token_type: string, user: object }>}
 */
export async function login({ login, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      login: login.trim(),
      password,
    }),
  });
  return parseResponse(response);
}

/**
 * Retrieve the profile details of the user associated with the active Bearer token.
 * Endpoint: GET /api/auth/user
 *
 * @param {string} token
 * @returns {Promise<{ success: boolean, user: object }>}
 */
export async function getUserProfile(token) {
  const response = await fetch(`${API_BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });
  return parseResponse(response);
}

/**
 * Sign out and invalidate the active Bearer token.
 * Endpoint: POST /api/auth/logout
 *
 * @param {string} token
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function logout(token) {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${token}`,
    },
  });
  return parseResponse(response);
}

/**
 * Initiate a password reset OTP code sent to user email.
 * Endpoint: POST /api/auth/password/forgot
 *
 * @param {string} email
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function requestPasswordReset(email) {
  const response = await fetch(`${API_BASE_URL}/auth/password/forgot`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ email: email.trim() }),
  });
  return parseResponse(response);
}

/**
 * Validate that the 6-digit reset code matches the active token.
 * Endpoint: POST /api/auth/password/verify-code
 *
 * @param {string} email
 * @param {string} code
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function verifyResetCode(email, code) {
  const response = await fetch(`${API_BASE_URL}/auth/password/verify-code`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      email: email.trim(),
      code: code.trim(),
    }),
  });
  return parseResponse(response);
}

/**
 * Completes the password reset process with verified OTP and new password.
 * Endpoint: POST /api/auth/password/reset
 *
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.code
 * @param {string} payload.password
 * @param {string} payload.password_confirmation
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function resetPassword({ email, code, password, password_confirmation }) {
  const response = await fetch(`${API_BASE_URL}/auth/password/reset`, {
    method: 'POST',
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({
      email: email.trim(),
      code: code.trim(),
      password,
      password_confirmation,
    }),
  });
  return parseResponse(response);
}

export { API_BASE_URL };
