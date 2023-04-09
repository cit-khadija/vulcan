from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in vulcan/__init__.py
from vulcan import __version__ as version

setup(
	name="vulcan",
	version=version,
	description="Vulcan Customizations",
	author="Craftinteractive LLC",
	author_email="support@craftinteractive.ae",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
