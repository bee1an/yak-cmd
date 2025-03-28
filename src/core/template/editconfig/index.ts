import { Command } from 'commander'
import { fileExistsSync } from '../../../utils'
import { join } from 'path'
import { writeFileSync } from 'fs'
import log from '../../../utils/log'

export default {
	install(program: Command) {
		program.option('-e, --editorconfig', 'Generate .editorconfig')
	},
	action(opts: { editorconfig?: boolean; rewrite: boolean }) {
		if (!opts.editorconfig) return

		const currentExecPath = process.cwd()

		const exist = fileExistsSync(join(currentExecPath, '.editorconfig'))

		if (exist && !opts.rewrite) {
			log.error('.editorconfig already exists')
			process.exit(0)
		}

		writeFileSync(join(currentExecPath, '.editorconfig'), template)

		log.success('.editorconfig created')
	}
}

const template = `[*.{js,jsx,ts,tsx,vue}]
root = true
charset = utf-8
indent_style = tab
indent_size = 2
end_of_line = lf
trim_trailing_whitespace = true
insert_final_newline = true
max_line_length = 100
`
