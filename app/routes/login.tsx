import { json, redirect } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';

// Mock authentication function
const authenticateUser = async (username, password) => {
  // Replace this with your actual authentication logic (e.g., database lookup)
  if (username === 'admin' && password === 'password') {
    return { success: true, user: { username } };
  }
  return { success: false };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  // Validate input
  if (!username || !password) {
    return json({ error: 'Both fields are required!' }, { status: 400 });
  }

  // Authenticate user
  const authResult = await authenticateUser(username, password);

  if (!authResult.success) {
    return json({ error: 'Invalid credentials!' }, { status: 401 });
  }

  // Redirect on successful login (e.g., to a dashboard)
  return redirect('/dashboard');
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          {actionData?.error && (
            <p className="text-red-500 text-sm">{actionData.error}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}