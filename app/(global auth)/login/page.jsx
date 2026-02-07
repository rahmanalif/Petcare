"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../../store/authSlice';
import Link from 'next/link';
import Image from 'next/image';

// Glassmorphism styles embedded
const glassStyles = `
  .glass-surface {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: opacity 0.26s ease-out;
  }

  .glass-surface__content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: inherit;
    position: relative;
    z-index: 1;
  }

  .glass-surface--fallback {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
    -webkit-backdrop-filter: blur(12px) saturate(1.8) brightness(1.1);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow:
      0 8px 32px 0 rgba(31, 38, 135, 0.15),
      0 2px 16px 0 rgba(31, 38, 135, 0.1),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.3),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);
  }

  .glass-surface--fallback:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @supports not (backdrop-filter: blur(10px)) {
    .glass-surface--fallback {
      background: rgba(255, 255, 255, 0.3);
      box-shadow:
        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2);
    }
  }
`;

// const anotherLOGO= () => (<svg width="463" height="513" viewBox="0 0 463 513" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M365.748 136.017C366.067 135.453 366.63 135.085 367.267 135.036C371.505 134.619 375.768 134.374 380.006 134.006C391.201 133.025 402.347 131.799 413.249 128.979C418.712 127.557 423.66 125.277 427.58 121.133C436.031 112.256 441.127 101.859 441.225 89.4026C441.274 83.7383 438.946 79.0303 433.606 76.5537C431.181 75.4502 428.388 75.0579 425.693 74.6656C415.233 73.1943 404.969 70.8648 394.851 67.8733C393.749 67.5545 393.136 66.9905 392.646 66.0588C390.466 61.9393 388.114 57.8443 384.832 54.534C373.93 43.5486 360.506 38.5464 345.612 36.4131C339.781 36.6583 333.926 36.5847 328.145 37.1978C318.346 38.2276 309.086 41.1701 301.296 47.472C297.474 50.5616 293.016 55.5393 288.9 61.3017C288.9 61.3017 282.653 71.061 279.64 87.0486C276.627 103.036 243.213 235.645 243.213 235.645C242.821 236.405 242.821 238.71 241.302 239.078C238.24 236.773 216.927 158.968 212.346 144.427C208.524 132.952 194.022 128.758 182.949 128.758C162.714 128.758 155.071 140.994 147.82 157.816C132.534 194.523 125.797 201.929 111.662 239.004C111.27 239.764 110.902 242.069 109.359 242.437C105.17 238.612 103.627 146.095 103.627 133.491C103.627 111.324 98.6537 97.568 73.0785 97.568C49.3895 97.568 41.3789 108.284 41.3789 130.818C41.3789 141.141 42.8977 151.833 42.8977 162.156C43.6572 211.86 45.2005 265.756 57.4002 313.915C63.1326 336.842 69.6243 366.659 99.0212 366.659C128.418 366.659 135.302 337.995 144.464 316.956C157.447 286.746 167.761 256.169 179.593 225.591C179.985 224.439 180.744 222.526 182.263 222.158C183.415 222.918 184.174 224.463 184.566 225.984C187.628 235.914 189.906 246.63 192.577 256.953C196.766 273.382 201.739 290.204 206.712 306.657C212.811 326.911 216.633 360.554 241.841 365.899C244.903 366.659 247.941 366.659 251.003 366.659C279.714 366.659 295.269 337.455 296.225 336.082C325.989 293.685 365.724 135.992 365.724 135.992L365.748 136.017Z" fill="#FE6C5D"/>
// <path d="M346.167 126.037C344.624 132.535 340.435 136.997 335.217 140.651C326.496 146.732 316.942 150.852 306.163 150.974C302.758 151.023 299.084 150.386 295.972 149.062C289.971 146.511 287.398 141.313 287.839 134.938C289.26 113.506 292.837 92.4676 300.553 72.3115C302.954 66.0341 305.796 59.953 310.401 54.9262C310.867 54.4113 311.357 53.9208 312.19 53.0381C310.548 56.0051 309.005 58.4327 307.78 61.0319C304.056 68.854 302.146 77.2647 300.284 85.6753C297.344 99.1127 295.85 112.746 294.723 126.453C294.503 129.151 294.356 131.848 294.282 134.545C294.135 139.253 297.442 143.52 302.121 144.133C307.413 144.82 312.533 143.863 317.555 142.367C323.948 140.455 329.656 137.267 334.85 133.074C340.117 128.832 341.66 122.947 341.978 116.621C342.542 105.88 341.146 95.2875 338.867 84.8171C337.544 78.6869 336.05 72.5567 334.629 66.451C334.507 65.887 334.384 65.3475 334.262 64.7836C334.384 64.759 334.482 64.71 334.605 64.6855C335.879 67.9467 337.201 71.159 338.402 74.4448C342.934 86.8033 346.486 99.3824 347.147 112.624C347.368 117.16 347.245 121.623 346.192 126.061L346.167 126.037Z" fill="white"/>
// <path d="M89.4166 340.202C75.9675 305.26 63.4494 267.939 61.3181 230.545C61.0486 225.935 58.4274 226.842 58.6724 231.476C60.8527 269.459 68.8878 306.927 82.5573 342.433C84.2231 346.724 91.0579 344.542 89.3921 340.202H89.4166Z" fill="#F2F2F2"/>
// <path d="M59.1898 196.092C57.2545 196.264 55.6622 197.833 55.7602 199.844L56.4216 214.09C56.5196 215.978 56.0296 217.719 57.9649 217.523C59.9002 217.351 61.4925 215.782 61.3945 213.771L62.9379 199.525C62.8399 197.637 61.1251 195.92 59.1898 196.092Z" fill="#F2F2F2"/>
// <path d="M62.8904 419.183C64.4582 421.194 74.7226 436.814 75.335 436.985C75.5555 436.838 75.4085 436.47 75.433 436.323C74.8941 432.106 74.2572 427.913 73.4487 423.719C73.0813 421.611 71.8074 418.546 72.6158 416.461C73.1793 415.039 74.4776 413.936 75.923 413.421C78.0298 412.661 81.1899 412.562 82.1208 415.088C82.5618 416.29 82.5863 417.638 82.8312 418.84C84.5705 428.55 86.8978 440.688 86.5058 450.496C86.3834 453.316 85.5014 455.891 82.6842 456.945C82.1943 457.117 81.7289 457.288 81.2144 457.362C76.9519 457.975 74.4286 452.924 72.2974 450.104C70.5826 447.823 68.8187 445.469 67.2264 443.115C66.222 441.644 65.2421 440.099 64.1887 438.726C64.0418 438.506 63.8213 438.309 63.6008 438.26C63.3803 438.407 63.3803 438.751 63.3803 438.947C63.2823 444.415 63.4293 449.81 63.1354 455.302C62.9149 459.128 63.3068 464.081 58.8728 465.724C54.2673 467.416 51.5236 463.124 49.3188 459.863C44.6399 453.022 41.2837 444.66 38.295 436.912C37.7071 435.293 36.8497 433.699 36.2618 432.081C34.9634 428.55 35.6003 426.392 39.3239 425.044C43.3415 423.572 44.9093 425.436 46.1832 428.918C46.9181 430.904 52.479 445.322 53.3609 445.666C53.5814 445.518 53.5079 445.126 53.5324 444.979C53.6059 438.358 53.3364 431.64 53.6059 425.019C53.7774 421.954 54.2673 419.6 57.452 418.423C59.1913 417.785 61.7145 417.614 62.9639 419.183H62.8904Z" fill="#004B5E"/>
// <path d="M126.881 442.454C124.725 445.151 121.54 447.064 118.184 447.799C105.838 450.497 101.012 437.819 98.9049 428.207C97.9495 423.843 97.435 418.987 98.023 414.549C98.3904 411.999 99.7623 410.184 102.31 409.645C104.441 409.179 107.454 409.571 108.018 412.122C108.116 412.612 108.091 413.029 108.018 413.568C107.503 417.81 107.797 421.905 108.728 426.147C109.292 428.698 110.051 431.297 110.958 433.773C111.717 435.76 114.265 441.228 116.959 440.639C117.841 440.443 118.405 439.806 118.846 439.119C122.447 434.019 121.173 422.151 119.899 416.29C119.532 414.598 119.164 412.857 118.576 411.141C118.135 409.669 117.327 408.345 116.984 406.776C116.371 403.981 118.576 402.387 121.075 401.823C123.378 401.332 125.387 401.823 126.513 403.981C128.008 406.997 128.939 410.307 129.649 413.568C131.486 422.003 132.687 435.318 126.905 442.454H126.881Z" fill="#004B5E"/>
// <path d="M141.763 403.712C142.694 398.832 153.204 396.38 157.368 395.865C160.161 395.522 167.094 395.056 167.584 398.979C167.878 401.259 165.232 402.755 163.321 402.976C161.876 403.148 160.308 403.098 158.863 403.27C157.025 403.491 153.62 404.104 152.052 404.962C151.391 405.305 151.66 412.22 151.783 413.226C151.856 413.863 152.248 414.329 152.934 414.231C154.257 414.059 157.809 412.073 160.724 411.73C163.076 411.436 166.383 412.196 166.726 415.114C167.241 419.184 156.266 420.41 153.424 422.494C152.885 422.887 152.861 423.647 152.934 424.284C153.106 425.609 153.914 430.219 154.796 431.077C155.678 431.935 155.825 432.622 155.972 433.823C156.168 435.417 156.535 436.913 156.731 438.482C157.148 441.915 155.531 443.852 152.052 444.269C149.088 444.637 147.055 443.337 146.124 440.419C144.017 433.799 142.694 426.761 141.861 419.92C141.249 414.918 140.784 408.665 141.714 403.712H141.763Z" fill="#004B5E"/>
// <path d="M182.8 395.669C187.454 394.516 193.579 394.001 198.356 393.756C200.83 393.633 205.068 393.658 205.239 397.091C205.411 400.401 200.781 401.039 198.429 401.161C196.004 401.284 193.652 401.529 191.3 401.676C189.267 401.799 189.904 403.025 190.002 404.692C190.124 406.85 190.296 409.081 190.418 411.264C190.467 412.098 191.129 412.686 191.962 412.661C194.828 412.514 203.941 410.871 204.186 415.604C204.382 419.184 199.36 419.895 196.812 420.018C195.342 420.091 193.946 419.969 192.476 420.067C191.643 420.116 191.031 420.655 191.08 421.538C191.227 424.211 191.423 426.884 191.766 429.556C191.888 430.439 192.305 431.322 192.354 432.205C192.501 434.951 189.512 436.324 187.16 436.447C185.764 436.52 184.147 436.226 183.069 435.196C181.256 433.578 181.354 430.488 181.232 428.257C180.595 418.767 179.836 409.204 179.321 399.714C179.199 397.557 180.791 396.183 182.824 395.693L182.8 395.669Z" fill="#004B5E"/>
// <path d="M215.441 416.462C215.514 406.702 221.197 396.06 231.486 394.417C233.52 394.123 235.577 393.878 237.684 393.878C248.218 393.951 253.509 401.087 253.436 411.165C253.338 423.425 245.744 434.215 232.711 434.117C222.055 434.043 215.343 426.957 215.441 416.413V416.462ZM225.656 416.167C225.631 420.949 227.175 426.907 232.981 426.956C239.864 427.006 243.269 417.197 243.294 411.459C243.294 408.909 242.339 401.749 238.958 401.725C238.199 401.725 237.488 401.896 236.729 401.896C235.847 401.896 234.94 401.7 234.058 401.676C228.645 401.626 225.68 411.827 225.656 416.167Z" fill="#004B5E"/>
// <path d="M278.393 396.575C281.186 396.722 283.954 397.507 286.673 398.365C294.66 400.915 299.216 407.487 298.751 415.897C298.163 426.736 289.54 436.372 278.271 435.759C267.051 435.146 261.049 425.681 261.637 415.113C262.127 405.795 267.957 396.011 278.418 396.575H278.393ZM283.856 405.255C282.68 404.74 281.333 404.544 280.01 404.471C279.177 404.422 278.442 404.127 277.609 404.078C277.217 404.078 276.85 404.078 276.507 404.348C273.2 406.481 271.951 411.778 271.755 415.407C271.681 416.805 271.657 418.276 271.853 419.625C272.318 422.91 274.939 428.624 278.761 428.82C279.79 428.869 280.745 428.55 281.602 428.011C286.085 425.51 288.486 420.189 288.756 415.235C288.952 411.41 287.678 406.923 283.856 405.255Z" fill="#004B5E"/>
// <path d="M329.857 398.807C327.285 402.461 320.671 398.611 319.985 407.463C319.152 418.227 327.358 429.017 326.55 439.34C325.962 447.039 319.666 449.835 312.684 449.295C310.21 449.099 305.139 448.511 305.409 445.029C305.629 442.111 308.936 441.522 311.288 441.694C313.591 441.866 315.771 442.552 316.016 439.364C316.751 429.679 308.691 418.056 309.573 406.678C310.112 399.665 314.448 395.595 321.038 393.927C322.532 393.535 324.027 393.192 325.619 393.314C328.167 393.51 331.866 396.036 329.857 398.831V398.807Z" fill="#004B5E"/>
// <path d="M267.706 441.792C216.948 438.825 165.675 444.882 116.998 459.57C103.133 463.763 89.4634 468.667 76.0878 474.233C73.2216 475.435 74.471 480.167 77.3862 478.966C124.152 459.521 174.224 448.364 224.811 446.304C239.118 445.715 253.424 445.862 267.706 446.696C270.866 446.868 270.842 441.964 267.706 441.792Z" fill="#004B5E"/>
// <path d="M291.885 445.494C286.398 444.709 280.91 443.924 275.423 443.14C274.124 442.944 272.801 443.459 272.41 444.856C272.091 446.009 272.802 447.676 274.124 447.872C279.612 448.657 285.099 449.442 290.587 450.226C291.885 450.422 293.208 449.908 293.6 448.51C293.918 447.357 293.208 445.69 291.885 445.494Z" fill="#004B5E"/>
// </svg>
// );

// GlassSurface Component
const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  className = '',
  style = {}
}) => {
  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div
      className={`glass-surface glass-surface--fallback ${className}`}
      style={containerStyle}
    >
      <div className="glass-surface__content">{children}</div>
    </div>
  );
};

// Main Login Component
export default function WuffoosLogin() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async () => {
    dispatch(loginStart());

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailOrPhone: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      dispatch(
        loginSuccess({
          user: {
            id: data._id,
            name: data.fullName,
            email: data.email,
            isBiometricEnabled: data.isBiometricEnabled,
          },
          role: data.role,
        })
      );

      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);

      if (data.role === 'pet_sitter') {
        router.push('/sitterdashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      dispatch(loginFailure(error.message || 'Login failed'));
    }
  };


  return (
    <>
      <style>{glassStyles}</style>
      <div className="min-h-screen flex">
        {/* Left Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-[#0C6478] flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-white text-4xl font-bold mb-3">
                Login to your account
              </h1>
              <p className="text-white/90 text-lg">
                Don't have an account?{' '}
                <Link href="/signup" className="text-[#FE6C5D] hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>

            <div className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-white text-sm mb-2">
                  Username or Email
                </label>
                <input
                  type="text"
                  placeholder="Username or Email"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white/60 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/90"
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-left">
                <Link href="/forgotpassword" className="text-white/80 hover:text-white text-sm">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full py-3 rounded-lg bg-[#FE6C5D] hover:bg-[#ff7a6d] text-white font-semibold transition-colors shadow-lg"
              >
                Login
              </button>


              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-white/20"></div>
                <span className="text-white/60 text-sm">Or continue with</span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>

              {/* Google Button with Glassmorphism */}
              {/* Social Login Buttons */}
              <div className="grid grid-cols-3 gap-3">
                {/* Google Button */}
                <GlassSurface
                  width="100%"
                  height={56}
                  borderRadius={8}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <button
                    type="button"
                    className="w-full h-full flex items-center justify-center gap-2 text-white font-medium"
                  >
                    <span><img src="/flag/g.png" alt="Google" className="w-6 h-6 " /></span>
                    Google
                  </button>
                </GlassSurface>

                {/* Apple Button */}
                <GlassSurface
                  width="100%"
                  height={56}
                  borderRadius={8}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <button
                    type="button"
                    className="w-full h-full flex items-center justify-center gap-2 text-white font-medium"
                  >
                    <span><img src="/flag/a.png" alt="Google" className="w-6 h-6 " /></span>
                    Apple
                  </button>
                </GlassSurface>

                {/* Facebook Button */}
                <GlassSurface
                  width="100%"
                  height={56}
                  borderRadius={8}
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <button
                    type="button"
                    className="w-full h-full flex items-center justify-center gap-2 text-white font-medium"
                  >
                    <span><img src="/flag/f.png" alt="Google" className="w-6 h-6 " /></span>
                    Facebook
                  </button>
                </GlassSurface>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Logo */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-gray-50 to-gray-100 items-center justify-center p-8">
          <div className="max-w-lg">
            < img src="/wuffoosFinal.png" />
          </div>
        </div>
      </div>
    </>
  );
}