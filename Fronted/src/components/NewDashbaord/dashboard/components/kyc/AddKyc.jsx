import React, { useState } from 'react';
import { HiArrowLeft, HiUpload, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import styles from '../../styles/CommonStyles.module.css';

const AddKyc = () => {
  const [kycData, setKycData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    documentType: '',
    documentNumber: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    documents: [],
    previewDocuments: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('KYC data:', kycData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKycData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map(file => URL.createObjectURL(file));
    
    setKycData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files],
      previewDocuments: [...prev.previewDocuments, ...previewUrls]
    }));
  };

  const removeDocument = (index) => {
    setKycData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
      previewDocuments: prev.previewDocuments.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className={styles.addKycContainer}>
      <div className={styles.formHeader}>
        <Link to="/users" className={styles.backButton}>
          <HiArrowLeft /> Back to KYC List
        </Link>
        <h1 className={styles.pageTitle}>KYC Verification Form</h1>
        <p className={styles.pageDescription}>Please fill in your details for KYC verification</p>
      </div>

      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.kycForm}>
            <div className={styles.formGrid}>
              {/* Personal Information */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName">First Name*</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={kycData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName">Last Name*</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={kycData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email*</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={kycData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number*</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={kycData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="dateOfBirth">Date of Birth*</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={kycData.dateOfBirth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="nationality">Nationality*</label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={kycData.nationality}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Document Information */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Document Information</h2>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="documentType">Document Type*</label>
                    <select
                      id="documentType"
                      name="documentType"
                      value={kycData.documentType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Document Type</option>
                      <option value="passport">Passport</option>
                      <option value="nationalId">National ID</option>
                      <option value="driverLicense">Driver's License</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="documentNumber">Document Number*</label>
                    <input
                      type="text"
                      id="documentNumber"
                      name="documentNumber"
                      value={kycData.documentNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Document Upload*</label>
                  <div className={styles.documentUploadBox}>
                    <input
                      type="file"
                      id="documents"
                      name="documents"
                      multiple
                      onChange={handleDocumentUpload}
                      accept="image/*,.pdf"
                      className={styles.documentInput}
                    />
                    <HiUpload className={styles.uploadIcon} />
                    <p>Upload your identification documents</p>
                    <span>Accepted formats: JPG, PNG, PDF (Max 5MB)</span>
                  </div>
                  <div className={styles.documentPreviewContainer}>
                    {kycData.previewDocuments.map((url, index) => (
                      <div key={index} className={styles.documentPreview}>
                        <img src={url} alt={`Document ${index + 1}`} />
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className={styles.removeDocumentButton}
                        >
                          <HiX />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className={styles.formSection}>
                <h2 className={styles.sectionTitle}>Address Information</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="address">Street Address*</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={kycData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="city">City*</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={kycData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="country">Country*</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={kycData.country}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="postalCode">Postal Code*</label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={kycData.postalCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formActions}>
              <Link to="/users" className={styles.cancelButton}>
                Cancel
              </Link>
              <button type="submit" className={styles.submitButton}>
                Submit KYC
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddKyc; 