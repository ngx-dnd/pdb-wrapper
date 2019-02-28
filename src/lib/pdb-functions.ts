
export function console_log(name: string, data: string) {
        if (localStorage.getItem('pdb_console_log') === 'true') {
                console.log(name, data);
        }
}
