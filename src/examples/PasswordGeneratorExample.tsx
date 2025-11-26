import { useState } from 'react';
import { StandardToolPage } from '@/components/StandardToolPage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const PasswordGeneratorExample = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState([16]);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });

    const generatePassword = () => {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            toast.error('Please select at least one character type');
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length[0]; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        toast.success('Password generated!');
    };

    // Input Section
    const inputSection = (
        <div className="space-y-6">
            {/* Password Length */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <Label htmlFor="length" className="text-base font-semibold">
                        Password Length
                    </Label>
                    <span className="text-2xl font-bold text-[#3A7AFE]">{length[0]}</span>
                </div>
                <Slider
                    id="length"
                    min={4}
                    max={64}
                    step={1}
                    value={length}
                    onValueChange={setLength}
                    className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500">
                    <span>4</span>
                    <span>64</span>
                </div>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
                <Label className="text-base font-semibold">Character Types</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <Checkbox
                            id="uppercase"
                            checked={options.uppercase}
                            onCheckedChange={(checked) =>
                                setOptions({ ...options, uppercase: checked as boolean })
                            }
                        />
                        <label
                            htmlFor="uppercase"
                            className="text-sm font-medium cursor-pointer flex-1"
                        >
                            Uppercase (A-Z)
                        </label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <Checkbox
                            id="lowercase"
                            checked={options.lowercase}
                            onCheckedChange={(checked) =>
                                setOptions({ ...options, lowercase: checked as boolean })
                            }
                        />
                        <label
                            htmlFor="lowercase"
                            className="text-sm font-medium cursor-pointer flex-1"
                        >
                            Lowercase (a-z)
                        </label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <Checkbox
                            id="numbers"
                            checked={options.numbers}
                            onCheckedChange={(checked) =>
                                setOptions({ ...options, numbers: checked as boolean })
                            }
                        />
                        <label
                            htmlFor="numbers"
                            className="text-sm font-medium cursor-pointer flex-1"
                        >
                            Numbers (0-9)
                        </label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                        <Checkbox
                            id="symbols"
                            checked={options.symbols}
                            onCheckedChange={(checked) =>
                                setOptions({ ...options, symbols: checked as boolean })
                            }
                        />
                        <label
                            htmlFor="symbols"
                            className="text-sm font-medium cursor-pointer flex-1"
                        >
                            Symbols (!@#$%)
                        </label>
                    </div>
                </div>
            </div>

            {/* Generate Button */}
            <Button
                onClick={generatePassword}
                className="w-full btn-primary text-lg py-6 hover:shadow-xl transition-all"
            >
                <RefreshCw className="w-5 h-5 mr-2" />
                Generate Password
            </Button>
        </div>
    );

    // Output Section
    const outputSection = password ? (
        <div className="flex items-center justify-center min-h-[180px]">
            <div className="text-center">
                <p className="text-xs text-gray-500 mb-2">Your Generated Password:</p>
                <p className="text-2xl sm:text-3xl font-mono font-bold text-gray-900 break-all px-4">
                    {password}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-green-600 font-medium">Strong Password</span>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center min-h-[180px]">
            <p className="text-gray-400 text-center">
                Click "Generate Password" to create a secure password
            </p>
        </div>
    );

    return (
        <StandardToolPage
            toolTitle="Password Generator"
            toolIcon="🔐"
            toolDescription="Generate secure, random passwords with customizable length and character types. Perfect for creating strong passwords for your accounts."
            toolCategory="Security"
            inputSection={inputSection}
            outputSection={outputSection}
            outputValue={password}
            examples={[
                {
                    title: 'Strong Password (16 characters)',
                    input: 'Length: 16, All character types',
                    output: 'aB3$xY9@mK2#pL5!',
                    description: 'Recommended for most accounts',
                },
                {
                    title: 'Extra Strong Password (32 characters)',
                    input: 'Length: 32, All character types',
                    output: 'xK9@pL5!aB3$mY2#qR7&nS4%wT8^',
                    description: 'Recommended for sensitive accounts',
                },
                {
                    title: 'PIN Code (Numbers only)',
                    input: 'Length: 6, Numbers only',
                    output: '847293',
                    description: 'Simple numeric PIN',
                },
            ]}
            faqs={[
                {
                    question: 'How secure are the generated passwords?',
                    answer:
                        'Our password generator uses cryptographically secure random number generation to create passwords. The longer the password and the more character types included, the more secure it will be.',
                },
                {
                    question: 'Are the passwords stored anywhere?',
                    answer:
                        'No! All password generation happens entirely in your browser. We never see, store, or transmit your generated passwords. Your privacy and security are our top priorities.',
                },
                {
                    question: 'What is a good password length?',
                    answer:
                        'We recommend at least 12-16 characters for most accounts. For highly sensitive accounts (banking, email), use 20+ characters. The longer the password, the more secure it is.',
                },
                {
                    question: 'Should I use all character types?',
                    answer:
                        'Yes! Using uppercase, lowercase, numbers, and symbols significantly increases password strength. However, some websites have restrictions, so adjust accordingly.',
                },
                {
                    question: 'How often should I change my passwords?',
                    answer:
                        'Change passwords immediately if you suspect a breach. Otherwise, changing every 3-6 months is a good practice. Always use unique passwords for different accounts.',
                },
            ]}
            relatedTools={[
                {
                    name: 'MD5 Hash Generator',
                    icon: '🔒',
                    url: '/tools/security/md5-hash-generator',
                    description: 'Generate MD5 hashes',
                },
                {
                    name: 'SHA256 Hash Generator',
                    icon: '🛡️',
                    url: '/tools/security/sha256-hash-generator',
                    description: 'Generate SHA256 hashes',
                },
                {
                    name: 'Base64 Encode/Decode',
                    icon: '🔓',
                    url: '/tools/security/base64-encode-decode',
                    description: 'Encode/decode Base64',
                },
            ]}
            seoDescription="Create strong, secure passwords instantly with our free password generator. Customize length (4-64 characters) and character types (uppercase, lowercase, numbers, symbols). All generation happens in your browser for maximum privacy and security. No signup required, completely free to use."
            privacyNote="Your password is generated entirely in your browser using cryptographically secure random number generation. We never see, store, or transmit your passwords. Your data never leaves your device."
            features={[
                'Cryptographically secure generation',
                'Customizable length (4-64 characters)',
                'Multiple character type options',
                'Instant generation',
                'No data stored or transmitted',
                'Works completely offline',
                'Copy to clipboard with one click',
                '100% free, no signup required',
            ]}
        />
    );
};

export default PasswordGeneratorExample;
