import { loadingIcon } from '../../icons/states'
import { execSync } from 'child_process'
import fs from 'fs'
import { commitlintConfigMjs, husky_commitMsg, husky_preCommit } from './paths'
import path from 'path'
import commitlintConfig from './commitlint-config'

export default function (execPath: string, devDependencies: Record<string, string>) {
	console.log(`${loadingIcon} Installing devDependencies`)

	let defaultDevDependencies = ''

	for (const key in devDependencies) {
		defaultDevDependencies += `${key}@${devDependencies[key as keyof typeof devDependencies]} `
	}

	execSync(`pnpm add ${defaultDevDependencies} -D -E`, { stdio: 'inherit' })

	execSync('npx husky init')

	fs.writeFileSync(path.join(execPath, husky_commitMsg), 'commitlint --edit "$1"')
	fs.writeFileSync(path.join(execPath, husky_preCommit), '\n')

	fs.writeFileSync(path.join(execPath, commitlintConfigMjs), commitlintConfig)
}
