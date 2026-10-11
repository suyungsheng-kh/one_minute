"""Package the generated, offline-ready site; never include animation source projects."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

root = Path(__file__).resolve().parent.parent
site = root / 'dist'
if not (site / 'index.html').is_file():
    raise SystemExit('Run npm run build before packaging.')
output = root / 'exports' / 'one-minute-portal.zip'
output.parent.mkdir(exist_ok=True)
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for file in sorted(site.rglob('*')):
        if file.is_file():
            archive.write(file, file.relative_to(site).as_posix())
with ZipFile(output) as archive:
    bad = archive.testzip()
    if bad:
        raise SystemExit(f'Invalid ZIP member: {bad}')
    count = len(archive.namelist())
print(json.dumps({'archive': str(output), 'files': count, 'bytes': output.stat().st_size, 'verified': True}))
