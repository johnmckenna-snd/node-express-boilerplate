import chalk from 'chalk';

export const log = {
	good: (message) => console.log('Good!', chalk.rgb(194, 242, 128)(message)),
	warn: (message) => console.log('Warning', chalk.rgb(255, 119, 0)(message)),
	error: (message) => console.log('ERROR', chalk.rgb(249, 65, 68).bold(message)),
	status: (message) => console.log('status', chalk.rgb(0, 180, 216)(message)),
	debug: (message) => console.log('DEBUG:', chalk.rgb(116, 0, 184)(message))
};
