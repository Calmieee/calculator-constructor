import type {Mode} from '../types';
import {Eye, Code} from 'lucide-react';

export const ModeToggle = ({ mode, onModeChange }: { mode: Mode; onModeChange: (mode: Mode) => void }) => (
	<div className="flex bg-gray-100 rounded-lg p-1">
		<button
			onClick={() => onModeChange('runtime')}
			className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all hover:cursor-pointer ${
				mode === 'runtime'
					? 'bg-white text-gray-900 shadow-sm'
					: 'text-gray-600 hover:text-gray-900'
			}`}
		>
			<Eye className={`${ mode === 'runtime' && 'stroke-violet-600'}`} />
			Runtime
		</button>
		<button
			onClick={() => onModeChange('constructor')}
			className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all hover:cursor-pointer ${
				mode === 'constructor'
					? 'bg-white text-gray-900 shadow-sm'
					: 'text-gray-600 hover:text-gray-900'
			}`}
		>
			<Code className={`${ mode === 'constructor' && 'stroke-violet-600'}`} />
			Constructor
		</button>
	</div>
);