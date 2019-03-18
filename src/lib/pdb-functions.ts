
export function console_log(name: string, data: any) {
        if (localStorage.getItem('pdb_console_log') === 'true') {
                console.log(name, data);
        }
}

export function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
