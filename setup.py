from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in sales_commission/__init__.py
from sales_commission import __version__ as version

setup(
	name="sales_commission",
	version=version,
	description="Commission",
	author="Dexciss",
	author_email="info@dexciss.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
