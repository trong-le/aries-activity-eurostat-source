# Aries Integration for Eurostat
Eurostat is the statistical office of the European Union situated in Luxembourg. Its task is to provide the European Union with statistics at European level that enable comparisons between countries and regions.

## Methods
### GetCountryData
This method takes in one dataset, country, and indice and outputs all data for available time periods with given precision, units, and seasonal adjustments.

## Parameters
### Format
Specifies the format the data should be returned in.
`JSON` or `Unicode`

### Dataset Code
Specifies which dataset you're attempting to access.
<br>
Ex. `sts_inpp_m --> Producer prices in industry, total - monthly data`

### NACE_R2
Specifies which indices within the dataset you're attempting to access.

Ex. `C27 --> Manufacture of electrical equipment`

### Precision
Specifies what precision (# of decimals) the data is returned.
Ex. `2 --> 123.XX`

### Unit
Specifies the unit for the data returned.
Ex. `I10 --> Indexed with the year 2010 = 100`

### Seasonal Adjustment
Specifies whether the data should be seasonally adjusted or not.
Ex. `NSA` --> Not Seasonally Adjusted

## To Do
- [ ] Allow for multiple countries
- [ ] Allow for multiple indices
- [ ] Allow for specific time periods
- [ ] Allow for 'from time period' specification